import chai, {expect} from "chai";
import sinonChai from "sinon-chai";
import {WalletMock} from "../wallet.mock.test";
import {kusamaConfiguration, westendConfiguration} from "../../../src/configuration/predefined";
import {configure} from "../../../src/rpc/configure";
import {EmptyMetamaskState} from "../../../src/interfaces";
import {SnapConfig} from "@nodefactory/metamask-polkadot-types";

chai.use(sinonChai);

describe('Test rpc handler function: configure', function() {
  const walletStub = new WalletMock();

  afterEach(function() {
    walletStub.reset();
  });

  it('should set predefined kusama configuration', async function() {
    // stubs
    walletStub.getPluginState.returns(EmptyMetamaskState());
    walletStub.updatePluginState.returnsArg(0);
    // tested method
    const result = configure(walletStub, "kusama", {});
    // assertions
    expect(result).to.be.deep.eq(kusamaConfiguration);
    expect(walletStub.updatePluginState).to.have.been.calledOnceWithExactly({
      polkadot: {
        config: kusamaConfiguration
      }
    });
    expect(walletStub.updatePluginState).to.have.been.calledOnce;
  });

  it('should set predefined westend configuration', async function() {
    // stubs
    walletStub.getPluginState.returns(EmptyMetamaskState());
    walletStub.updatePluginState.returnsArg(0);
    // tested method
    const result = configure(walletStub, "westend", {});
    // assertions
    expect(result).to.be.deep.eq(westendConfiguration);
    expect(walletStub.updatePluginState).to.have.been.calledOnceWithExactly({
      polkadot: {
        config: westendConfiguration
      }
    });
    expect(walletStub.updatePluginState).to.have.been.calledOnce;
  });

  it('should set custom configuration', async function() {
    // stubs
    walletStub.getPluginState.returns(EmptyMetamaskState());
    walletStub.updatePluginState.returnsArg(0);
    const customConfiguration: SnapConfig = {
      addressPrefix: 1,
      networkName: "test-network",
      unit: {assetId: "test-asset", customViewUrl: "custom-view-url", decimals: 1, image: "image", symbol: "TST" },
      wsRpcUrl: "ws-rpc-url",

    };
    // tested method
    const result = configure(walletStub, "test-network", customConfiguration);
    // assertions
    expect(result).to.be.deep.eq(customConfiguration);
    expect(walletStub.updatePluginState).to.have.been.calledOnceWithExactly({
      polkadot: {
        config: customConfiguration
      }
    });
    expect(walletStub.updatePluginState).to.have.been.calledOnce;
  });

  it('should set predefined kusama configuration with additional property override', function () {
    // stubs
    walletStub.getPluginState.returns(EmptyMetamaskState());
    walletStub.updatePluginState.returnsArg(0);
    // tested method
    const customConfiguration = kusamaConfiguration;
    customConfiguration.unit.symbol = "TST_KSM";
    const result = configure(walletStub, "kusama", {unit: {symbol: "TST_KSM"}} as SnapConfig);
    // assertions
    expect(result).to.be.deep.eq(customConfiguration);
    expect(walletStub.updatePluginState).to.have.been.calledOnceWithExactly({
      polkadot: {
        config: customConfiguration
      }
    });
    expect(walletStub.updatePluginState).to.have.been.calledOnce;
  });
});