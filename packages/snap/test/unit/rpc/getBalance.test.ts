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
    walletStub.getAppKey.returns(testAppKey);
    walletStub.getPluginState.returns(EmptyMetamaskState());
    const apiStub = {request: sinon.stub()};
    apiStub.request.returns("3");

    const result = await getBalance(walletStub, apiStub);

    expect(result).to.be.eq("3");
  });
});
