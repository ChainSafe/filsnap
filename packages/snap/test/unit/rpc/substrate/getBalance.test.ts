import chai, {expect} from "chai";
import sinonChai from "sinon-chai";
import {WalletMock} from "../../wallet.mock.test";
import {getBalance} from "../../../../src/rpc/substrate/getBalance";
import ApiPromise from "@polkadot/api/promise";
import {AccountInfo} from "@polkadot/types/interfaces/system";
import sinon from "sinon";
import {testAddress, testAppKey} from "../keyPairTestConstants";
import {EmptyMetamaskState} from "../../../../src/interfaces";

chai.use(sinonChai);

describe('Test rpc handler function: getBalance', function() {

  const walletStub = new WalletMock();

  afterEach(function() {
    walletStub.reset();
  });

  it('should return balance on saved keyring in state', async function () {
    // wallet stub
    walletStub.getAppKey.returns(testAppKey);
    walletStub.getPluginState.returns(EmptyMetamaskState());
    // api stub
    const apiStub = {query: {system: {account: sinon.stub()}}};
    apiStub.query.system.account.returns({data: {free: '0'}} as unknown as AccountInfo);
    const api = apiStub as unknown as ApiPromise;
    const result = await getBalance(walletStub, api);
    expect(result).to.be.eq("0");
    expect(walletStub.getAppKey).to.have.been.calledOnce;
    // eslint-disable-next-line max-len
    expect(apiStub.query.system.account).to.have.been.calledOnceWith(testAddress);
  });
});
