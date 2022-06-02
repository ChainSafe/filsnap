import chai, {expect} from "chai";
import sinonChai from "sinon-chai";
import {WalletMock} from "../wallet.mock.test";
import {filecoinTestnetConfiguration} from "../../../src/configuration/predefined";
import {configure} from "../../../src/rpc/configure";
import {EmptyMetamaskState} from "../../../src/interfaces";
import {SnapConfig} from "@chainsafe/filsnap-types";

chai.use(sinonChai);

describe('Test rpc handler function: configure', function() {
  const walletStub = new WalletMock();

  afterEach(function() {
    walletStub.reset();
  });

  it('should set predefined filecoin configuration based on network', async function() {
    walletStub.rpcStubs.snap_manageState
      .withArgs('get')
      .resolves(EmptyMetamaskState());

    walletStub.rpcStubs.snap_manageState
      .withArgs('update', {filecoin: {config: filecoinTestnetConfiguration, messages: []}})
      .resolves();

    const result = await configure(walletStub, "t");

    expect(result.snapConfig).to.be.deep.eq(filecoinTestnetConfiguration);
    expect(walletStub.rpcStubs.snap_manageState).to.have.been.calledWithExactly(
      'update', {filecoin: {config: filecoinTestnetConfiguration, messages: []}}
    );
    expect(walletStub.rpcStubs.snap_manageState).to.have.been.calledTwice;
  });

  it('should set predefined filecoin configuration with additional property override', async function () {
    const customConfiguration = filecoinTestnetConfiguration;
    customConfiguration.unit.symbol = "xFIL";

    walletStub.rpcStubs.snap_manageState
      .withArgs('get')
      .resolves(EmptyMetamaskState());

    walletStub.rpcStubs.snap_manageState
      .withArgs('update', {filecoin: {config: customConfiguration, messages: []}})
      .resolves();
    
    const result = await configure(walletStub, "t", {unit: {symbol: "xFIL"}} as SnapConfig);

    expect(result.snapConfig).to.be.deep.eq(customConfiguration);
    expect(walletStub.rpcStubs.snap_manageState).to.have.been.calledWithExactly(
      'update', {filecoin: {config: customConfiguration, messages: []}}
    );
    expect(walletStub.rpcStubs.snap_manageState).to.have.been.calledTwice;
  });

  it('should throw error if wrong derivation path on mainet', async function() {
    walletStub.rpcStubs.snap_manageState
      .withArgs('get')
      .resolves(EmptyMetamaskState());

    let err = null;
    try {
      await configure(walletStub, "f", {derivationPath: "m/44'/1'/0'/0/0"} as SnapConfig);
    } catch(e) {
      err = e;
    }

    expect(err).to.be.an('Error');
    expect(err.message).to.be.equal('Wrong CoinType in derivation path');
  });

  it('should throw error if wrong derivation path on testnet', async function() {
    walletStub.rpcStubs.snap_manageState
      .withArgs('get')
      .resolves(EmptyMetamaskState());

    let err = null;
    try {
      await configure(walletStub, "t", {derivationPath: "m/44'/461'/0'/0/0"} as SnapConfig);
    } catch(e) {
      err = e;
    }

    expect(err).to.be.an('Error');
    expect(err.message).to.be.equal('Wrong CoinType in derivation path');
  });
});
