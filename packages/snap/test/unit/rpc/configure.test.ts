import { SnapConfig } from "@chainsafe/filsnap-types";
import chai, { expect } from "chai";
import sinonChai from "sinon-chai";
import { filecoinTestnetConfiguration } from "../../../src/configuration/predefined";
import { EmptyMetamaskState } from "../../../src/interfaces";
import { configure } from "../../../src/rpc/configure";
import { mockSnapProvider } from "../wallet.mock.test";

chai.use(sinonChai);

describe("Test rpc handler function: configure", function () {
  const walletStub = mockSnapProvider();

  afterEach(function () {
    walletStub.reset();
  });

  it("should set predefined filecoin configuration based on network", async function () {
    walletStub.rpcStubs.snap_manageState
      .withArgs({ operation: 'get' })
      .resolves(EmptyMetamaskState());

    walletStub.rpcStubs.snap_manageState
      .withArgs(
        {
          newState: {
            filecoin: { config: filecoinTestnetConfiguration, messages: [] },
          }, operation: 'update'
        }
      )
      .resolves();

    const result = await configure(walletStub, "t");

    expect(result.snapConfig).to.be.deep.eq(filecoinTestnetConfiguration);
    expect(walletStub.rpcStubs.snap_manageState).to.have.been.calledWithExactly(
      {
        newState: {
          filecoin: { config: filecoinTestnetConfiguration, messages: [] },
        }, operation: 'update'
      }
    );
    expect(walletStub.rpcStubs.snap_manageState).to.have.been.calledTwice;
  });

  it("should set predefined filecoin configuration with additional property override", async function () {
    const customConfiguration = filecoinTestnetConfiguration;
    customConfiguration.unit.symbol = "xFIL";

    walletStub.rpcStubs.snap_manageState
      .withArgs({ operation: 'get' })
      .resolves(EmptyMetamaskState());

    walletStub.rpcStubs.snap_manageState
      .withArgs(
        {
          newState: {
            filecoin: { config: customConfiguration, messages: [] },
          }, operation: 'update'
        }
      )
      .resolves();

    const result = await configure(walletStub, "t", {
      unit: { symbol: "xFIL" },
    } as SnapConfig);

    expect(result.snapConfig).to.be.deep.eq(customConfiguration);
    expect(walletStub.rpcStubs.snap_manageState).to.have.been.calledWithExactly(
      {
        newState: {
          filecoin: { config: customConfiguration, messages: [] },
        }, operation: 'update'
      }
    );
    expect(walletStub.rpcStubs.snap_manageState).to.have.been.calledTwice;
  });

  it("should throw error if wrong derivation path on mainet", async function () {
    walletStub.rpcStubs.snap_manageState
      .withArgs({ operation: 'get' })
      .resolves(EmptyMetamaskState());

    let err = null;
    try {
      await configure(walletStub, "f", {
        derivationPath: "m/44'/1'/0'/0/0",
      } as SnapConfig);
    } catch (e) {
      err = e;
    }

    expect(err).to.be.an("Error");
    expect(err.message).to.be.equal("Wrong CoinType in derivation path");
  });

  it("should throw error if wrong derivation path on testnet", async function () {
    walletStub.rpcStubs.snap_manageState
      .withArgs({ operation: 'get' })
      .resolves(EmptyMetamaskState());

    let err = null;
    try {
      await configure(walletStub, "t", {
        derivationPath: "m/44'/461'/0'/0/0",
      } as SnapConfig);
    } catch (e) {
      err = e;
    }

    expect(err).to.be.an("Error");
    expect(err.message).to.be.equal("Wrong CoinType in derivation path");
  });
});
