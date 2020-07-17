import chai, {expect} from "chai";
import sinonChai from "sinon-chai";
import {WalletMock} from "../wallet.mock.test";
import {getAddress} from "../../../src/rpc/getAddress";
import {testAppKey, testAddress} from "./keyPairTestConstants";
import {SnapConfig} from "@nodefactory/metamask-filecoin-types";

chai.use(sinonChai);

describe('Test rpc handler function: getAddress', function() {

  const walletStub = new WalletMock();

  afterEach(function() {
    walletStub.reset();
  });

  it('should return valid address', async function () {
    walletStub.getAppKey.returns(testAppKey);
    walletStub.getPluginState.returns({
      filecoin: {config: {network: "f", derivationPath: "m/44'/461'/0/0/1"} as SnapConfig}
    });
    const result = await getAddress(walletStub);
    expect(result).to.be.eq(testAddress);
  });

});
