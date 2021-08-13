import chai, {expect} from "chai";
import sinonChai from "sinon-chai";
import {WalletMock} from "../wallet.mock.test";
import {getKeyPair} from "../../../src/filecoin/account";
import {testAddress, testBip44Entropy, testPrivateKey, testPublicKey} from "../rpc/keyPairTestConstants";
import {SnapConfig} from "@chainsafe/filsnap-types";

chai.use(sinonChai);

describe('Test account function: getKeyPair', function() {

  const walletStub = new WalletMock();

  afterEach(function() {
    walletStub.reset();
  });

  it('should return valid keypair for filecoin mainnnet', async function() {
    walletStub.getPluginState.returns({
      filecoin: {config: {network: "f", derivationPath: "m/44'/461'/0'/0/0"} as SnapConfig}
    });
    walletStub.updatePluginState.returnsArg(0);
    // ensure our call to getBip44Entropy returns the correct entropy
    walletStub.send.returns(testBip44Entropy);
    const result = await getKeyPair(walletStub);
    expect(result.publicKey).to.be.eq(testPublicKey);
    expect(result.address).to.be.eq(testAddress);
    expect(result.privateKey).to.be.eq(testPrivateKey);
    expect(walletStub.getAppKey).to.have.not.been.called;
    expect(walletStub.send).to.have.been.calledOnce;
    expect(walletStub.getPluginState).to.have.been.calledOnce;
  });
});
