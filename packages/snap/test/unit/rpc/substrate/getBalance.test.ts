import chai, {expect} from "chai";
import sinonChai from "sinon-chai";
import {WalletMock} from "../../wallet.mock.test";
import sinon from "sinon";
import {testAddress, testAppKey} from "../keyPairTestConstants";
import {EmptyMetamaskState} from "../../../../src/interfaces";

chai.use(sinonChai);

describe('Test rpc handler function: getBalance', function() {

  const walletStub = new WalletMock();

  afterEach(function() {
    walletStub.reset();
  });

});
