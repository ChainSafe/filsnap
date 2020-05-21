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
  });

  afterEach(function() {
    walletStub.reset();
    axiosStub.reset();
  });

});
