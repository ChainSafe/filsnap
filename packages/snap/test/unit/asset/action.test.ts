import chai, {expect} from "chai";
import sinonChai from "sinon-chai";
import {WalletMock} from "../wallet.mock.test";
import {Asset} from "../../../src/interfaces";
import {executeAssetOperation} from "../../../src/asset/action";

chai.use(sinonChai);

describe('Test asset function: executeAssetOperation', function() {
  const walletStub = new WalletMock();
  const testAsset: Asset = {
    balance: "100",
    customViewUrl: `https://polkascan.io/`,
    decimals: 0,
    identifier: 'test-asset',
    image: 'image.png',
    symbol: 'TST',
  };

  afterEach(function() {
    walletStub.reset();
  });

  it('should call add method with provided asset', async () => {
    // stubs
    walletStub.send.returns(testAsset);
    // tested method
    const result = await executeAssetOperation(testAsset, walletStub, "add");
    // assertions
    expect(result).not.to.be.null;
    expect(result).to.be.eq(testAsset);
    expect(walletStub.send).to.have.been.calledOnceWithExactly({
      method: 'wallet_manageAssets',
      params: ["add", testAsset]
    });
  });

  it('should call update method with provided asset', async () => {
    // stubs
    walletStub.send.returns(testAsset);
    // tested method
    const result = await executeAssetOperation(testAsset, walletStub, "update");
    // assertions
    expect(result).not.to.be.null;
    expect(result).to.be.eq(testAsset);
    expect(walletStub.send).to.have.been.calledOnceWithExactly({
      method: 'wallet_manageAssets',
      params: ["update", testAsset]
    });
  });

  it('should call remove method with provided asset', async () => {
    // stubs
    walletStub.send.returns(null);
    // tested method
    const result = await executeAssetOperation(testAsset, walletStub, "remove");
    // assertions
    expect(result).to.be.null;
    expect(walletStub.send).to.have.been.calledOnceWithExactly({
      method: 'wallet_manageAssets',
      params: ["remove", testAsset]
    });
  });
});