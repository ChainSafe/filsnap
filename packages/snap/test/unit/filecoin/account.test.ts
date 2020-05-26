import chai, {expect} from "chai";
import sinonChai from "sinon-chai";
import {WalletMock} from "../wallet.mock.test";
import {getKeyPair} from "../../../src/filecoin/account";
import {testAddress, testAppKey, testPublicKey} from "../rpc/keyPairTestConstants";

chai.use(sinonChai);

describe('Test account function: getKeyPair', function() {

  const walletStub = new WalletMock();

  afterEach(function() {
    walletStub.reset();
  });

  it('should return keypair', async function() {
    walletStub.getAppKey.returns(testAppKey);
    walletStub.updatePluginState.returnsArg(0);
    const result = await getKeyPair(walletStub);
    expect(walletStub.getAppKey).to.have.been.calledOnce;
    expect(result.address).to.be.eq(testAddress);
    expect(result.public_hexstring).to.be.deep.eq(testPublicKey);
  });
});
