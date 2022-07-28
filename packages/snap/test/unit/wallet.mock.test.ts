import { SnapConfig } from "@chainsafe/filsnap-types";
import { SnapProvider } from "@metamask/snap-types";
import sinon from "sinon";
import {
  testNewBip44Entropy,
  testNewMetamaskVersion,
} from "./rpc/keyPairTestConstants";

//@ts-expect-error
class WalletMock implements SnapProvider {
  public readonly registerRpcMessageHandler = sinon.stub();

  public readonly requestStub = sinon.stub();

  public readonly rpcStubs = {
    snap_confirm: sinon.stub(),
    snap_getBip44Entropy_461: sinon.stub(),
    snap_manageState: sinon.stub(),
    web3_clientVersion: sinon.stub(),
  };

  /**
   * Calls this.requestStub or this.rpcStubs[req.method], if the method has
   * a dedicated stub.
   */
  public request(
    args: Parameters<SnapProvider["request"]>[0]
  ): ReturnType<SnapProvider["request"]> {
    const { method, params = [] } = args;
    if (Object.hasOwnProperty.call(this.rpcStubs, method)) {
      //@ts-expect-error
      // eslint-disable-next-line
      return (this.rpcStubs as any)[method](...params);
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.requestStub(args);
  }

  public reset(): void {
    this.registerRpcMessageHandler.reset();
    this.requestStub.reset();
    Object.values(this.rpcStubs).forEach(
      (stub: ReturnType<typeof sinon.stub>) => stub.reset()
    );
  }

  public prepareFoKeyPair(): void {
    this.rpcStubs.snap_manageState.withArgs("get").resolves({
      filecoin: {
        config: {
          derivationPath: "m/44'/461'/0'/0/0",
          network: "f",
        } as SnapConfig,
      },
    });
    this.rpcStubs.snap_getBip44Entropy_461.resolves(testNewBip44Entropy);
    this.rpcStubs.web3_clientVersion.resolves(testNewMetamaskVersion);
  }
}

//risky hack but it's hard to stub all provider methods
export function mockSnapProvider(): SnapProvider & WalletMock {
  const mock = new WalletMock();
  return mock as any as SnapProvider & WalletMock;
}
