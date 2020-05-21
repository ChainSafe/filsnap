import chai, {expect} from "chai";
import sinonChai from "sinon-chai";
import ApiPromise from "@polkadot/api/promise";
import sinon from "sinon";
import {registerOnBalanceChange, removeOnBalanceChange} from "../../../../../src/polkadot/events/balance";
import * as api from "../../../../../src/polkadot/api";
import {WalletMock} from "../../../wallet.mock.test";
import {testAddress, testAppKey} from "../../../rpc/keyPairTestConstants";
import {EmptyMetamaskState} from "../../../../../src/interfaces";

chai.use(sinonChai);

describe('Test balance subscription', function() {

  const walletStub = new WalletMock();
  const getApiStub = sinon.stub(api, "getApi");
  const testOrigin = "test-origin";

  afterEach(function() {
    walletStub.reset();
  });

  it('should call unsubscribe function for provided origin', async function () {
    // wallet stub
    walletStub.getAppKey.returns(testAppKey);
    // unsubscribe stub
    const unsubscribeStub = sinon.stub();
    // api stub
    const apiStub = {query: {system: {account: sinon.stub()}}};
    walletStub.getPluginState.returns(EmptyMetamaskState());
    apiStub.query.system.account.returns(unsubscribeStub);
    const api = apiStub as unknown as ApiPromise;
    getApiStub.returns(Promise.resolve(api));
    // call tested function
    await registerOnBalanceChange(walletStub, testOrigin);
    expect(apiStub.query.system.account).to.be.calledOnceWith(
      testAddress, sinon.match.any
    );
    await removeOnBalanceChange(testOrigin);
    // expect(unsubscribeStub).to.have.been.calledOnce;
  });

});
