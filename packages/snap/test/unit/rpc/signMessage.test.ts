import {WalletMock} from "../wallet.mock.test";
import chai, {expect} from "chai";
import sinonChai from "sinon-chai";
import {testAppKey} from "./keyPairTestConstants";
import {SnapConfig} from "@nodefactory/metamask-filecoin-types";
import {Message} from "@zondax/filecoin-signing-tools/js";
import {signMessage} from "../../../src/rpc/signMessage";

chai.use(sinonChai);

describe('Test rpc handler function: getPublicKey', function () {
    const walletStub = new WalletMock();

    const unsignedMessage: Message = {
        from: "t1hw4amnow4gsgk2ottjdpdverfwhaznyrslsmoni",
        to: "t12flyjpedjjqlrr2dmlnrtbh62qav3b3h7o7lohy",
        gaslimit: 10000,
        gasprice: "0",
        method: 1,
        nonce: 90571,
        value: "5000000000000000",
    };

    afterEach(function() {
        walletStub.reset();
    });

    it('should successfully sign valid message', async function () {
        walletStub.getAppKey.returns(testAppKey);
        walletStub.getPluginState.returns({
            filecoin: {config: {network: "f", derivationPath: "m/44'/461'/0/0/1"} as SnapConfig}
        });

        const signedMessage = await signMessage(walletStub, unsignedMessage);
        expect(walletStub.getPluginState).to.have.been.calledOnce;
        expect(walletStub.getAppKey).to.have.been.calledOnce;
        expect(signedMessage.message).to.be.eq(unsignedMessage);
        expect(signedMessage.signature.data).to.not.be.empty;
        expect(signedMessage.signature.type).to.be.eq(1);
    });

    it('should fail signing on invalid message ', async function () {
        walletStub.getAppKey.returns(testAppKey);
        walletStub.getPluginState.returns({
            filecoin: {config: {network: "f", derivationPath: "m/44'/461'/0/0/1"} as SnapConfig}
        });

        const invalidMessage = unsignedMessage;
        invalidMessage.value = "-5000000000000000";

        expect(async () => {
            return await signMessage(walletStub, invalidMessage);
        }).to.throw;
    });
});