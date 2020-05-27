import chai, {expect} from "chai";
import sinonChai from "sinon-chai";
import {WalletMock} from "../wallet.mock.test";
import {filecoinConfiguration} from "../../../src/configuration/predefined";
import {configure} from "../../../src/rpc/configure";
import {EmptyMetamaskState} from "../../../src/interfaces";
import {SnapConfig} from "@nodefactory/metamask-filecoin-types";

chai.use(sinonChai);

describe('Test rpc handler function: configure', function() {
  const walletStub = new WalletMock();

  afterEach(function() {
    walletStub.reset();
  });

  it('should set predefined filecoin configuration', async function() {
    walletStub.getPluginState.returns(EmptyMetamaskState());
    walletStub.updatePluginState.returnsArg(0);

    const result = configure(walletStub, {});

    expect(result).to.be.deep.eq(filecoinConfiguration);
    expect(walletStub.updatePluginState).to.have.been.calledOnceWithExactly({
      filecoin: {
        config: filecoinConfiguration
      }
    });
    expect(walletStub.updatePluginState).to.have.been.calledOnce;
  });

  it('should set predefined filecoin configuration with additional property override', function () {
    walletStub.getPluginState.returns(EmptyMetamaskState());
    walletStub.updatePluginState.returnsArg(0);

    const customConfiguration = filecoinConfiguration;
    customConfiguration.wsRpcUrl = "wss://custom";
    const result = configure(walletStub, {wsRpcUrl: "wss://custom"} as SnapConfig);

    expect(result).to.be.deep.eq(customConfiguration);
    expect(walletStub.updatePluginState).to.have.been.calledOnceWithExactly({
      filecoin: {
        config: customConfiguration
      }
    });
    expect(walletStub.updatePluginState).to.have.been.calledOnce;
  });
});
