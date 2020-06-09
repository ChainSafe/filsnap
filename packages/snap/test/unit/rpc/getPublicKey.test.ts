import {WalletMock} from "../wallet.mock.test";
import {testAppKey, testPublicKey} from "./keyPairTestConstants";
import chai, {expect} from "chai";
import sinonChai from "sinon-chai";
import {getPublicKey} from "../../../src/rpc/getPublicKey";

chai.use(sinonChai);

describe('Test rpc handler function: getPublicKey', function () {
    const walletStub = new WalletMock();

    afterEach(function() {
        walletStub.reset();
    });

    it('should return valid address', async function () {
        walletStub.getAppKey.returns(testAppKey);
        walletStub.getPluginState.returns({filecoin: {config: {network: "f"}}});
        const result = await getPublicKey(walletStub);
        expect(result).to.be.eq(testPublicKey);
    });
});