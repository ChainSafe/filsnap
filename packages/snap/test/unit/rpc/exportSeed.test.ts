import chai, {expect} from "chai";
import sinonChai from "sinon-chai";
import {exportSeed} from "../../../src/rpc/exportSeed";
import {WalletMock} from "../wallet.mock.test";
import {getDefaultConfiguration} from "../../../src/configuration/index";

chai.use(sinonChai);

describe('Test rpc handler function: exportSeed', function() {

  const walletStub = new WalletMock();

  afterEach(function() {
    walletStub.reset();
  });

  it('should return seed on positive prompt confirmation and keyring saved in state', async function () {
    walletStub.send.returns(true);
    walletStub.getAppKey.returns("aba2dd1a12eeafda3fda62aa6dfa21ca2aa6dfaba13fda6a22ea2dd1eafda1ca");

    const result = await exportSeed(walletStub);

    expect(walletStub.send).to.have.been.calledOnce;
    expect(walletStub.getAppKey).to.have.been.calledOnce;
    expect(result.appKey).to.be.eq("aba2dd1a12eeafda3fda62aa6dfa21ca2aa6dfaba13fda6a22ea2dd1eafda1ca");
    expect(result.derivationPath).to.be.eq(getDefaultConfiguration().derivationPath);
  });

  it('should not return seed on negative prompt confirmation', async function () {
    walletStub.send.returns(false);

    const result = await exportSeed(walletStub);

    expect(walletStub.send).to.have.been.calledOnce;
    expect(result).to.be.eq(null);
  });
});
