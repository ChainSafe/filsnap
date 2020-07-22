import chai, {expect} from "chai";
import sinonChai from "sinon-chai";
import {WalletMock} from "../wallet.mock.test";
import {getBalance} from "../../../src/rpc/getBalance";
import sinon from "sinon";
import {testAppKey} from "./keyPairTestConstants";
import {EmptyMetamaskState} from "../../../src/interfaces";

chai.use(sinonChai);

describe('Test rpc handler function: getBalance', function() {

  const walletStub = new WalletMock();

  afterEach(function() {
    walletStub.reset();
  });

  it('should return balance on saved keyring in state', async function () {
    // prepare stubs
    walletStub.getAppKey.returns(testAppKey);
    walletStub.getPluginState.returns(EmptyMetamaskState());
    const apiStub = {walletBalance: sinon.stub(), version: sinon.stub(), mpoolGetNonce: sinon.stub()};
    apiStub.walletBalance.returns("3000000000000000000");
    // call getBalance
    const result = await getBalance(walletStub, apiStub);
    // assertions
    expect(walletStub.getAppKey).to.have.been.calledOnce;
    expect(walletStub.getPluginState).to.have.been.calledOnce;
    expect(result).to.be.eq("3");
  });
});
