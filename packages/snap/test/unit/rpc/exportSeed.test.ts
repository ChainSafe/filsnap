import chai, {expect} from "chai";
import sinonChai from "sinon-chai";
import {exportPrivateKey} from "../../../src/rpc/exportPrivateKey";
import {WalletMock} from "../wallet.mock.test";
import {testBip44Entropy, testPrivateKey} from "./keyPairTestConstants";
import {SnapConfig} from "@nodefactory/filsnap-types";

chai.use(sinonChai);

describe('Test rpc handler function: exportSeed', function() {

  const walletStub = new WalletMock();

  afterEach(function() {
    walletStub.reset();
  });

  it('should return seed on positive prompt confirmation and keyring saved in state', async function () {
    walletStub.requestStub.resolves(true);
    walletStub.requestStub.resolves(testBip44Entropy);
    walletStub.rpcStubs.snap_getState.resolves({
      filecoin: {config: {network: "f", derivationPath: "m/44'/461'/0'/0/0"} as SnapConfig}
    });

    const result = await exportPrivateKey(walletStub);

    expect(walletStub.rpcStubs.snap_getAppKey).to.have.not.been.called;
    expect(walletStub.requestStub).to.have.been.calledTwice;
    expect(walletStub.rpcStubs.snap_getState).to.have.been.calledOnce;
    expect(result).to.be.eq(testPrivateKey);
  });

  it('should not return seed on negative prompt confirmation', async function () {
    walletStub.requestStub.resolves(false);

    const result = await exportPrivateKey(walletStub);

    expect(walletStub.requestStub).to.have.been.calledOnce;
    expect(result).to.be.eq(null);
  });
});
