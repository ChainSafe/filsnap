import chai, {expect} from "chai";
import sinonChai from "sinon-chai";
import {WalletMock} from "../wallet.mock.test";
import {filecoinTestnetConfiguration} from "../../../src/configuration/predefined";
import {configure} from "../../../src/rpc/configure";
import {EmptyMetamaskState} from "../../../src/interfaces";
import {SnapConfig} from "@nodefactory/filsnap-types";

chai.use(sinonChai);

describe('Test rpc handler function: configure', function() {
  const walletStub = new WalletMock();

  afterEach(function() {
    walletStub.reset();
  });

  it('should set predefined filecoin configuration based on network', async function() {
    walletStub.getPluginState.returns(EmptyMetamaskState());
    walletStub.updatePluginState.returnsArg(0);

    const result = configure(walletStub, "t");

    expect(result).to.be.deep.eq(filecoinTestnetConfiguration);
    expect(walletStub.updatePluginState).to.have.been.calledOnceWithExactly({
      filecoin: {
        config: filecoinTestnetConfiguration,
        messages: []
      }
    });
    expect(walletStub.updatePluginState).to.have.been.calledOnce;
  });

  it('should set predefined filecoin configuration with additional property override', function () {
    walletStub.getPluginState.returns(EmptyMetamaskState());
    walletStub.updatePluginState.returnsArg(0);

    const customConfiguration = filecoinTestnetConfiguration;
    customConfiguration.rpc.url = "wss://custom";
    const result = configure(walletStub, "t", {rpc: {url: "wss://custom"}} as SnapConfig);

    expect(result).to.be.deep.eq(customConfiguration);
    expect(walletStub.updatePluginState).to.have.been.calledOnceWithExactly({
      filecoin: {
        config: customConfiguration,
        messages: []
      }
    });
    expect(walletStub.updatePluginState).to.have.been.calledOnce;
  });
});
