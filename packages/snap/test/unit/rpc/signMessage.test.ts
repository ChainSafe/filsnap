import {WalletMock} from "../wallet.mock.test";
import chai, {expect} from "chai";
import sinonChai from "sinon-chai";
import {testAppKey} from "./keyPairTestConstants";
import {SnapConfig} from "@nodefactory/metamask-filecoin-types";
import {Message, PartialMessage} from "@zondax/filecoin-signing-tools/js";
import {signMessage} from "../../../src/rpc/signMessage";
import sinon from "sinon";

chai.use(sinonChai);

describe('Test rpc handler function: signMessage', function () {
    const walletStub = new WalletMock();
    const apiStub = {
        walletBalance: sinon.stub(),
        version: sinon.stub(),
        mpoolGetNonce: sinon.stub()
    };

    const partialMessage: PartialMessage = {
        to: "t12flyjpedjjqlrr2dmlnrtbh62qav3b3h7o7lohy",
        value: "5000000000000000",
    };

    const fullMessage: Message = {
        ...partialMessage,
        from: "f1rovwtiuo5ncslpmpjftzu5akswbgsgighjazxoi",
        gaslimit: 10,
        gasprice: "5",
        method: 1,
        nonce: 0
    };

    afterEach(function() {
        walletStub.reset();
        apiStub.walletBalance.reset();
        apiStub.mpoolGetNonce.reset();
        apiStub.version.reset();
    });

    it('should successfully sign valid message on positive prompt', async function () {
        walletStub.send.returns(true);
        walletStub.getAppKey.returns(testAppKey);
        walletStub.getPluginState.returns({
            filecoin: {config: {network: "f", derivationPath: "m/44'/461'/0/0/1"} as SnapConfig}
        });
        apiStub.mpoolGetNonce.returns("0");
        const signedMessage = await signMessage(walletStub, apiStub, partialMessage);
        expect(walletStub.send).to.have.been.calledOnce;
        expect(walletStub.getPluginState).to.have.been.calledOnce;
        expect(walletStub.getAppKey).to.have.been.calledOnce;
        expect(signedMessage.message).to.be.deep.eq(fullMessage);
        expect(signedMessage.signature.data).to.not.be.empty;
        expect(signedMessage.signature.type).to.be.eq(1);
    });

    it('should cancel signing on negative prompt', async function () {
        walletStub.send.returns(false);
        walletStub.getAppKey.returns(testAppKey);
        walletStub.getPluginState.returns({
            filecoin: {config: {network: "f", derivationPath: "m/44'/461'/0/0/1"} as SnapConfig}
        });
        apiStub.mpoolGetNonce.returns("0");
        const signedMessage = await signMessage(walletStub, apiStub, partialMessage);
        expect(walletStub.send).to.have.been.calledOnce;
        expect(walletStub.getPluginState).to.have.been.calledOnce;
        expect(walletStub.getAppKey).to.have.been.calledOnce;
        expect(signedMessage).to.be.null;
    });

    it('should fail signing on invalid message ', async function () {
        walletStub.send.returns(true);
        walletStub.getAppKey.returns(testAppKey);
        walletStub.getPluginState.returns({
            filecoin: {config: {network: "f", derivationPath: "m/44'/461'/0/0/1"} as SnapConfig}
        });

        const invalidMessage = partialMessage;
        invalidMessage.value = "-5000000000000000";

        apiStub.mpoolGetNonce.returns("0");

        expect(async () => {
            return await signMessage(walletStub, apiStub, invalidMessage);
        }).to.throw;
    });
});