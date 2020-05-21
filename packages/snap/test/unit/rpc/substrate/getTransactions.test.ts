import chai, {expect} from "chai";
import sinonChai from "sinon-chai";
import {WalletMock} from "../../wallet.mock.test";
import sinon from "sinon";
import axios from "axios";
import {getTransactions} from "../../../../src/rpc/substrate/getTransactions";
import {testAppKey} from "../keyPairTestConstants";
import {defaultConfiguration, westendConfiguration} from "../../../../src/configuration/predefined";

chai.use(sinonChai);

describe('Test rpc handler function: getTransactions', function() {

  const walletStub = new WalletMock();
  const axiosStub = sinon.stub(axios, "get");

  beforeEach(function () {
    walletStub.getAppKey.returns(testAppKey);
    walletStub.getPluginState.returns({polkadot: {configuration: westendConfiguration}});
  });

  afterEach(function() {
    walletStub.reset();
    axiosStub.reset();
  });

  it('should return transactions history from api on successful request', async function () {
    axiosStub.resolves(Promise.resolve({data: {data: ["test-transaction"]}, status: 200}));
    const transactions = await getTransactions(walletStub);
    expect(walletStub.getAppKey).to.have.been.calledOnce;
    expect(walletStub.getPluginState).to.have.been.calledOnce;
    expect(axios.get).to.have.been.calledOnce;
    expect(transactions).to.be.deep.eq(["test-transaction"]);
  });

  it('should return null from api on failed request', async function () {
    axiosStub.resolves(Promise.resolve({data: "", status: 500}));
    const transactions = await getTransactions(walletStub);
    expect(walletStub.getAppKey).to.have.been.calledOnce;
    expect(walletStub.getPluginState).to.have.been.calledOnce;
    expect(axios.get).to.have.been.calledOnce;
    expect(transactions).to.be.eq(null);
  });
});
