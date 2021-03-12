import {WalletMock} from "../wallet.mock.test";
import chai, {expect} from "chai";
import sinonChai from "sinon-chai";
import {testBip44Entropy} from "./keyPairTestConstants";
import {MessageRequest, SnapConfig} from "@nodefactory/filsnap-types";
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
        walletStub.requestStub.callsFake(async (req) => {
            if (req.method === 'wallet_getBip44Entropy_461') return testBip44Entropy;
            if (req.method === 'confirm') return true;
            throw new Error('unknown rpc method')
        })
        walletStub.rpcStubs.snap_getState.resolves({
            filecoin: {config: {network: "f", derivationPath: "m/44'/461'/0'/0/0"} as SnapConfig}
        });
        apiStub.mpoolGetNonce.returns("0");
        apiStub.gasEstimateGasLimit.returns(1000);
        apiStub.gasEstimateMessageGas.returns({GasPremium: "10", GasFeeCap: "10"});
        const signedMessage = await signMessage(walletStub, apiStub, messageRequest);
        expect(walletStub.requestStub).to.have.been.calledTwice;
        expect(walletStub.rpcStubs.snap_getState).to.have.been.calledOnce;
        expect(walletStub.rpcStubs.snap_getAppKey).to.have.not.been.called;
        expect(apiStub.mpoolGetNonce).to.have.been.calledOnce;
        expect(apiStub.gasEstimateGasLimit).to.have.been.calledOnce;
        expect(apiStub.gasEstimateMessageGas).to.have.been.calledOnce;
        expect(signedMessage.message).to.be.deep.eq(fullMessage);
        expect(signedMessage.signature.data).to.not.be.empty;
        expect(signedMessage.signature.type).to.be.eq(1);
    });

    it('should successfully sign valid message with gas params on positive prompt', async function () {
        walletStub.requestStub.callsFake(async (req) => {
            if (req.method === 'wallet_getBip44Entropy_461') return testBip44Entropy;
            if (req.method === 'confirm') return true;
            throw new Error('unknown rpc method')
        })
        walletStub.rpcStubs.snap_getState.resolves({
            filecoin: {config: {network: "f", derivationPath: "m/44'/461'/0'/0/0"} as SnapConfig}
        });
        apiStub.mpoolGetNonce.returns("0");
        const messageRequestWithGasParams: MessageRequest = {
            ...messageRequest,
            gaspremium: "10",
            gasfeecap: "10",
            gaslimit: 1000
        };
        const signedMessage = await signMessage(walletStub, apiStub, messageRequestWithGasParams);
        expect(walletStub.requestStub).to.have.been.calledTwice;
        expect(walletStub.rpcStubs.snap_getState).to.have.been.calledOnce;
        expect(walletStub.rpcStubs.snap_getAppKey).to.have.not.been.called;
        expect(signedMessage.message).to.be.deep.eq(fullMessage);
        expect(signedMessage.signature.data).to.not.be.empty;
        expect(signedMessage.signature.type).to.be.eq(1);
    });

    it('should cancel signing on negative prompt', async function () {
        walletStub.requestStub.callsFake(async (req) => {
            if (req.method === 'wallet_getBip44Entropy_461') return testBip44Entropy;
            if (req.method === 'confirm') return false;
            throw new Error('unknown rpc method')
        })
        walletStub.rpcStubs.snap_getState.resolves({
            filecoin: {config: {network: "f", derivationPath: "m/44'/461'/0'/0/0"} as SnapConfig}
        });
        apiStub.mpoolGetNonce.returns("0");
        const messageRequestWithGasParams: MessageRequest = {
            ...messageRequest,
            gaspremium: "10",
            gasfeecap: "10",
            gaslimit: 1000
        };
        const signedMessage = await signMessage(walletStub, apiStub, messageRequestWithGasParams);
        expect(walletStub.requestStub).to.have.been.calledTwice;
        expect(walletStub.rpcStubs.snap_getState).to.have.been.calledOnce;
        expect(walletStub.rpcStubs.snap_getAppKey).to.have.not.been.called;
        expect(signedMessage).to.be.null;
    });

    it('should fail signing on invalid message ', async function () {
        walletStub.requestStub.onCall(0).returns(true);
        walletStub.requestStub.onCall(1).returns(testBip44Entropy);
        walletStub.rpcStubs.snap_getState.resolves({
            filecoin: {config: {network: "f", derivationPath: "m/44'/461'/0'/0/0"} as SnapConfig}
        });

        const invalidMessage = messageRequest;
        invalidMessage.value = "-5000000000000000";

        apiStub.mpoolGetNonce.returns("0");

        expect(async () => {
            return await signMessage(walletStub, apiStub, invalidMessage);
        }).to.throw;
    });
});