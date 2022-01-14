import chai, {expect} from "chai";
import sinonChai from "sinon-chai";
import {exportPrivateKey} from "../../../src/rpc/exportPrivateKey";
import {WalletMock} from "../wallet.mock.test";
import {testBip44Entropy, testPrivateKeyBase64} from "./keyPairTestConstants";
import {SnapConfig} from "@chainsafe/filsnap-types";

chai.use(sinonChai);

describe('Test rpc handler function: exportSeed', function() {

  const walletStub = new WalletMock();

  afterEach(function() {
    walletStub.reset();
  });

  it('should return seed on positive prompt confirmation and keyring saved in state', async function () {
    walletStub.rpcStubs.snap_confirm.resolves(true);
    walletStub.rpcStubs.snap_manageState
      .withArgs('get')
      .resolves({filecoin: {config: {network: "f", derivationPath: "m/44'/461'/0'/0/0"} as SnapConfig}});
    walletStub.rpcStubs.snap_getBip44Entropy_461.resolves(testBip44Entropy);

    const result = await exportPrivateKey(walletStub);

    expect(walletStub.rpcStubs.snap_confirm).to.have.been.calledOnce;
    expect(walletStub.rpcStubs.snap_manageState).to.have.been.calledOnce;
    expect(walletStub.rpcStubs.snap_getBip44Entropy_461).to.have.been.calledOnce;
    
    expect(result).to.be.eq(testPrivateKeyBase64);
  });

  it('should not return seed on negative prompt confirmation', async function () {
    walletStub.rpcStubs.snap_confirm.resolves(false);

    const result = await exportPrivateKey(walletStub);

    expect(walletStub.rpcStubs.snap_confirm).to.have.been.calledOnce;
    expect(result).to.be.eq(null);
  });
});
