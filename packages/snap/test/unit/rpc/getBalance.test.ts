import chai, {expect} from "chai";
import sinonChai from "sinon-chai";
import {WalletMock} from "../wallet.mock.test";
import {getBalance} from "../../../src/rpc/getBalance";
import {testAppKey} from "./keyPairTestConstants";
import {EmptyMetamaskState} from "../../../src/interfaces";
import {LotusApiMock} from "../lotusapi.mock.test";

chai.use(sinonChai);

describe('Test rpc handler function: getBalance', function() {

  const walletStub = new WalletMock();
  const apiStub = new LotusApiMock();

  afterEach(function() {
    walletStub.reset();
    apiStub.reset();
  });

  it('should return balance on saved keyring in state', async function () {
    // prepare stubs
    walletStub.getAppKey.returns(testAppKey);
    walletStub.getPluginState.returns(EmptyMetamaskState());
    apiStub.walletBalance.returns("30000000");
    // call getBalance
    const result = await getBalance(walletStub, apiStub);
    // assertions
    expect(walletStub.getAppKey).to.have.been.calledOnce;
    expect(walletStub.getPluginState).to.have.been.calledOnce;
    expect(result).to.be.eq("30000000");
  });
});
