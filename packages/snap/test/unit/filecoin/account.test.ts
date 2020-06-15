import chai, {expect} from "chai";
import sinonChai from "sinon-chai";
import {WalletMock} from "../wallet.mock.test";
import {getKeyPair} from "../../../src/filecoin/account";
import {testAddress, testAppKey, testPrivateKey, testPublicKey} from "../rpc/keyPairTestConstants";

chai.use(sinonChai);

describe('Test account function: getKeyPair', function() {

  const walletStub = new WalletMock();

  afterEach(function() {
    walletStub.reset();
  });

  it('should return valid keypair for filecoin mainnnet', async function() {
    walletStub.getAppKey.returns(testAppKey);
    walletStub.getPluginState.returns({filecoin: {config: {network: "f"}}});
    walletStub.updatePluginState.returnsArg(0);
    const result = await getKeyPair(walletStub);
    expect(result.publicKey).to.be.eq(testPublicKey);
    expect(result.address).to.be.eq(testAddress);
    expect(result.privateKey).to.be.eq(testPrivateKey);
    expect(walletStub.getAppKey).to.have.been.calledOnce;
    expect(walletStub.getPluginState).to.have.been.calledOnce;
  });


  it('should return valid keypair for filecoin testnet', async function() {
    walletStub.getAppKey.returns(testAppKey);
    walletStub.getPluginState.returns({filecoin: {config: {network: "t"}}});
    walletStub.updatePluginState.returnsArg(0);
    const result = await getKeyPair(walletStub);
    expect(result.publicKey).to.be.eq(testPublicKey);
    expect(result.address).to.be.eq("t" + testAddress.slice(1));
    expect(result.privateKey).to.be.eq(testPrivateKey);
    expect(walletStub.getAppKey).to.have.been.calledOnce;
    expect(walletStub.getPluginState).to.have.been.calledOnce;
  });
});
