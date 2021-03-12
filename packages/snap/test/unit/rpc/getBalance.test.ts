import chai, {expect} from "chai";
import sinonChai from "sinon-chai";
import {WalletMock} from "../wallet.mock.test";
import {getBalance} from "../../../src/rpc/getBalance";
import {testBip44Entropy} from "./keyPairTestConstants";
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
    walletStub.requestStub.resolves(testBip44Entropy);
    walletStub.rpcStubs.snap_getState.resolves(EmptyMetamaskState());
    apiStub.walletBalance.returns("30000000");
    // call getBalance
    const result = await getBalance(walletStub, apiStub);
    // assertions
    expect(walletStub.rpcStubs.snap_getAppKey).to.have.not.been.called;
    expect(walletStub.rpcStubs.snap_getState).to.have.been.calledOnce;
    expect(result).to.be.eq("0.00000000003");
  });
});
