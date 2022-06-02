import chai, {expect} from "chai";
import sinonChai from "sinon-chai";
import {WalletMock} from "../wallet.mock.test";
import {getKeyPair} from "../../../src/filecoin/account";
import {
  testAddress,
  testNewBip44Entropy, testNewMetamaskVersion, testOldBip44Entropy,
  testOldMetamaskVersion,
  testPrivateKeyBase64,
  testPublicKey
} from "../rpc/keyPairTestConstants";
import {SnapConfig} from "@chainsafe/filsnap-types";

chai.use(sinonChai);

describe('Test account function: getKeyPair', function() {

  const walletStub = new WalletMock();

  afterEach(function() {
    walletStub.reset();
  });

  it('should return valid keypair for filecoin mainnnet with old version of metamask', async function() {
    walletStub.rpcStubs.snap_manageState
      .withArgs('get')
      .resolves({filecoin: {config: {derivationPath: "m/44'/461'/0'/0/0", network: "f"} as SnapConfig}});

    walletStub.rpcStubs.snap_getBip44Entropy_461.resolves(testOldBip44Entropy);
    walletStub.rpcStubs.web3_clientVersion.resolves(testOldMetamaskVersion);
    // ensure our call to getBip44Entropy returns the correct entropy
    walletStub.requestStub.resolves(testOldBip44Entropy);
    const result = await getKeyPair(walletStub);

    expect(result.publicKey).to.be.eq(testPublicKey);
    expect(result.address).to.be.eq(testAddress);
    expect(result.privateKey).to.be.eq(testPrivateKeyBase64);
    expect(walletStub.rpcStubs.snap_getBip44Entropy_461).to.have.been.calledOnce;
    expect(walletStub.rpcStubs.snap_manageState).to.have.been.calledOnce;
    expect(walletStub.rpcStubs.web3_clientVersion).to.have.been.calledOnce;
  });

  it('should return valid keypair for filecoin mainnnet with new version of metamask', async function() {
    walletStub.rpcStubs.snap_manageState
      .withArgs('get')
      .resolves({filecoin: {config: {derivationPath: "m/44'/461'/0'/0/0", network: "f"} as SnapConfig}});

    walletStub.rpcStubs.snap_getBip44Entropy_461.resolves(testNewBip44Entropy);
    walletStub.rpcStubs.web3_clientVersion.resolves(testNewMetamaskVersion);
    // ensure our call to getBip44Entropy returns the correct entropy
    walletStub.requestStub.resolves(testNewBip44Entropy);

    const result = await getKeyPair(walletStub);
    expect(result.publicKey).to.be.eq(testPublicKey);
    expect(result.address).to.be.eq(testAddress);
    expect(result.privateKey).to.be.eq(testPrivateKeyBase64);
    expect(walletStub.rpcStubs.snap_getBip44Entropy_461).to.have.been.calledOnce;
    expect(walletStub.rpcStubs.snap_manageState).to.have.been.calledOnce;
    expect(walletStub.rpcStubs.web3_clientVersion).to.have.been.calledOnce;
  });
});
