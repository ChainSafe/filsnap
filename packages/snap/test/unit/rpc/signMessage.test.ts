import {WalletMock} from "../wallet.mock.test";
import chai, {expect} from "chai";
import sinonChai from "sinon-chai";
import {testBip44Entropy} from "./keyPairTestConstants";
import {MessageRequest, SnapConfig} from "@chainsafe/filsnap-types";
import {Message} from "@zondax/filecoin-signing-tools/js";
import {signMessage} from "../../../src/rpc/signMessage";
import {LotusApiMock} from "../lotusapi.mock.test";

chai.use(sinonChai);

describe('Test rpc handler function: signMessage', function () {
    const walletStub = new WalletMock();
    const apiStub = new LotusApiMock();

    const messageRequest: MessageRequest = {
        to: "t12flyjpedjjqlrr2dmlnrtbh62qav3b3h7o7lohy",
        value: "5000000000000000",
    };

    const fullMessage: Message = {
        ...messageRequest,
        from: "f1ekszptik2ognlx24xz7zubejtw3cyidv4t4ibyy",
        gaslimit: 1000,
        gasfeecap: "10",
        gaspremium: "10",
        method: 0,
        nonce: 0,
        params: []
    };

    afterEach(function() {
        walletStub.reset();
        apiStub.reset();
    });

    it('should successfully sign valid message without gas params on positive prompt', async function () {
        walletStub.rpcStubs.snap_confirm.resolves(true);
        walletStub.rpcStubs.snap_getBip44Entropy_461.resolves(testBip44Entropy);
        walletStub.rpcStubs.snap_manageState
            .withArgs('get')
            .resolves({filecoin: {config: {network: "f", derivationPath: "m/44'/461'/0'/0/0"} as SnapConfig}});
        apiStub.mpoolGetNonce.returns("0");
        apiStub.gasEstimateGasLimit.returns(1000);
        apiStub.gasEstimateMessageGas.returns({GasPremium: "10", GasFeeCap: "10"});

        const signedMessage = await signMessage(walletStub, apiStub, messageRequest);
        
        expect(walletStub.rpcStubs.snap_confirm).to.have.been.calledOnce;
        expect(walletStub.rpcStubs.snap_getBip44Entropy_461).to.have.been.calledOnce;
        expect(walletStub.rpcStubs.snap_manageState).to.have.been.calledOnce;
        expect(apiStub.mpoolGetNonce).to.have.been.calledOnce;
        expect(apiStub.gasEstimateGasLimit).to.have.been.calledOnce;
        expect(apiStub.gasEstimateMessageGas).to.have.been.calledOnce;
        expect(signedMessage.message).to.be.deep.eq(fullMessage);
        expect(signedMessage.signature.data).to.not.be.empty;
        expect(signedMessage.signature.type).to.be.eq(1);
    });

    it('should successfully sign valid message with gas params on positive prompt', async function () {
        walletStub.rpcStubs.snap_confirm.resolves(true);
        walletStub.rpcStubs.snap_getBip44Entropy_461.resolves(testBip44Entropy);
        walletStub.rpcStubs.snap_manageState
            .withArgs('get')
            .resolves({filecoin: {config: {network: "f", derivationPath: "m/44'/461'/0'/0/0"} as SnapConfig}});
        apiStub.mpoolGetNonce.returns("0");
        const messageRequestWithGasParams: MessageRequest = {
            ...messageRequest,
            gaspremium: "10",
            gasfeecap: "10",
            gaslimit: 1000,
            nonce: 1
        };
        const signedMessage = await signMessage(walletStub, apiStub, messageRequestWithGasParams);
        expect(walletStub.rpcStubs.snap_confirm).to.have.been.calledOnce;
        expect(walletStub.rpcStubs.snap_getBip44Entropy_461).to.have.been.calledOnce;
        expect(walletStub.rpcStubs.snap_manageState).to.have.been.calledOnce;
        expect(signedMessage.message).to.be.deep.eq({...fullMessage, nonce: 1});
        expect(apiStub.mpoolGetNonce).to.have.not.been.called;
        expect(signedMessage.signature.data).to.not.be.empty;
        expect(signedMessage.signature.type).to.be.eq(1);
    });

    it('should cancel signing on negative prompt', async function () {
        walletStub.rpcStubs.snap_confirm.resolves(false);
        walletStub.rpcStubs.snap_getBip44Entropy_461.resolves(testBip44Entropy);
        walletStub.rpcStubs.snap_manageState
            .withArgs('get')
            .resolves({filecoin: {config: {network: "f", derivationPath: "m/44'/461'/0'/0/0"} as SnapConfig}});
        apiStub.mpoolGetNonce.returns("0");
        const messageRequestWithGasParams: MessageRequest = {
            ...messageRequest,
            gaspremium: "10",
            gasfeecap: "10",
            gaslimit: 1000
        };
        
        const signedMessage = await signMessage(walletStub, apiStub, messageRequestWithGasParams);
        
        expect(walletStub.rpcStubs.snap_confirm).to.have.been.calledOnce;
        expect(walletStub.rpcStubs.snap_getBip44Entropy_461).to.have.been.calledOnce;
        expect(walletStub.rpcStubs.snap_manageState).to.have.been.calledOnce;
        expect(signedMessage).to.be.null;
    });

    it('should fail signing on invalid message ', async function () {
        walletStub.rpcStubs.snap_confirm.resolves(true);
        walletStub.rpcStubs.snap_getBip44Entropy_461.resolves(testBip44Entropy);
        walletStub.rpcStubs.snap_manageState
            .withArgs('get')
            .resolves({filecoin: {config: {network: "f", derivationPath: "m/44'/461'/0'/0/0"} as SnapConfig}});

        const invalidMessage = messageRequest;
        invalidMessage.value = "-5000000000000000";

        apiStub.mpoolGetNonce.returns("0");

        expect(async () => {
            return await signMessage(walletStub, apiStub, invalidMessage);
        }).to.throw;
    });
});