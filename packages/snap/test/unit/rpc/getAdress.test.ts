import chai, {expect} from "chai";
import sinonChai from "sinon-chai";
import {WalletMock} from "../wallet.mock.test";
import {getAddress} from "../../../src/rpc/getAddress";
import {testBip44Entropy, testAddress} from "./keyPairTestConstants";
import {SnapConfig} from "@nodefactory/filsnap-types";

chai.use(sinonChai);

describe('Test rpc handler function: getAddress', function() {

  const walletStub = new WalletMock();

  afterEach(function() {
    walletStub.reset();
  });

  it('should return valid address', async function () {
    walletStub.send.returns(testBip44Entropy);
    walletStub.getPluginState.returns({
      filecoin: {config: {network: "f", derivationPath: "m/44'/461'/0'/0/0"} as SnapConfig}
    });
    const result = await getAddress(walletStub);
    expect(result).to.be.eq(testAddress);
  });

});
