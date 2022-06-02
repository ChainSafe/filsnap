import chai, {expect} from "chai";
import sinonChai from "sinon-chai";
import {WalletMock} from "../wallet.mock.test";
import {getAddress} from "../../../src/rpc/getAddress";
import {testNewBip44Entropy, testAddress, testNewMetamaskVersion} from "./keyPairTestConstants";
import {SnapConfig} from "@chainsafe/filsnap-types";

chai.use(sinonChai);

describe('Test rpc handler function: getAddress', function() {

  const walletStub = new WalletMock();

  afterEach(function() {
    walletStub.reset();
  });

  it('should return valid address', async function () {
    walletStub.prepareFoKeyPair();

    const result = await getAddress(walletStub);
    
    expect(result).to.be.eq(testAddress);
    expect(walletStub.rpcStubs.snap_manageState).to.have.been.calledOnce;
    expect(walletStub.rpcStubs.snap_getBip44Entropy_461).to.have.been.calledOnce;
  });

  it('should respect all derivation path fields', async function () {
    walletStub.rpcStubs.web3_clientVersion.resolves(testNewMetamaskVersion);
    walletStub.rpcStubs.snap_getBip44Entropy_461.resolves(testNewBip44Entropy);
    walletStub.rpcStubs.snap_manageState
      .withArgs('get')
      .resolves({filecoin: {config: {derivationPath: "m/44'/461'/1'/0/0", network: "f"} as SnapConfig}});
    let result = await getAddress(walletStub);
    expect(result).to.not.be.eq(testAddress);
    expect(result).to.not.be.null;
    
    walletStub.rpcStubs.snap_manageState
      .withArgs('get')
      .resolves({filecoin: {config: {derivationPath: "m/44'/461'/0'/1/0", network: "f"} as SnapConfig}});
    result = await getAddress(walletStub);
    expect(result).to.not.be.eq(testAddress);
    expect(result).to.not.be.null;

    walletStub.rpcStubs.snap_manageState
      .withArgs('get')
      .resolves({filecoin: {config: {derivationPath: "m/44'/461'/0'/0/1", network: "f"} as SnapConfig}});
    result = await getAddress(walletStub);
    expect(result).to.not.be.eq(testAddress);
    expect(result).to.not.be.null;
  });


});
