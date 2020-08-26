import chai, {expect} from "chai";
import sinonChai from "sinon-chai";
import {exportPrivateKey} from "../../../src/rpc/exportPrivateKey";
import {WalletMock} from "../wallet.mock.test";
import {testAppKey, testPrivateKey} from "./keyPairTestConstants";
import {SnapConfig} from "@nodefactory/filsnap-types";

chai.use(sinonChai);

describe('Test rpc handler function: exportSeed', function() {

  const walletStub = new WalletMock();

  afterEach(function() {
    walletStub.reset();
  });

  it('should return seed on positive prompt confirmation and keyring saved in state', async function () {
    walletStub.send.returns(true);
    walletStub.getAppKey.returns(testAppKey);
    walletStub.getPluginState.returns({
      filecoin: {config: {network: "f", derivationPath: "m/44'/461'/0/0/1"} as SnapConfig}
    });

    const result = await exportPrivateKey(walletStub);

    expect(walletStub.send).to.have.been.calledOnce;
    expect(walletStub.getAppKey).to.have.been.calledOnce;
    expect(walletStub.getPluginState).to.have.been.calledOnce;
    expect(result).to.be.eq(testPrivateKey);
  });

  it('should not return seed on negative prompt confirmation', async function () {
    walletStub.send.returns(false);

    const result = await exportPrivateKey(walletStub);

    expect(walletStub.send).to.have.been.calledOnce;
    expect(result).to.be.eq(null);
  });
});
