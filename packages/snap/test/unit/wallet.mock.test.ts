import { SnapConfig } from "@chainsafe/filsnap-types";
import { SnapsGlobalObject } from "@metamask/snaps-types";
import sinon from "sinon";
import {
  testBip44Entropy,
  testNewMetamaskVersion,
} from "./rpc/keyPairTestConstants";
class WalletMock implements SnapsGlobalObject {
  public readonly registerRpcMessageHandler = sinon.stub();

  public readonly requestStub = sinon.stub();

  public readonly rpcStubs = {
    snap_confirm: sinon.stub(),
    snap_getBip44Entropy: sinon.stub(),
    snap_getBip44Entropy_461: sinon.stub(),
    snap_manageState: sinon.stub(),
    web3_clientVersion: sinon.stub(),
  };

  /**
   * Calls this.requestStub or this.rpcStubs[req.method], if the method has
   * a dedicated stub.
   */
  public request(
    args: Parameters<SnapsGlobalObject["request"]>[0]
  ): ReturnType<SnapsGlobalObject["request"]> {
    const { method, params = [] } = args;
    if (Object.hasOwnProperty.call(this.rpcStubs, method)) {
      // eslint-disable-next-line
      return (this.rpcStubs as any)[method](...(Array.isArray(params) ? params : [params]));
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
    this.rpcStubs.snap_getBip44Entropy.resolves(testBip44Entropy);
    this.rpcStubs.web3_clientVersion.resolves(testNewMetamaskVersion);
  }
}

//risky hack but it's hard to stub all provider methods
export function mockSnapProvider(): SnapsGlobalObject & WalletMock {
  const mock = new WalletMock();
  return mock as any as SnapsGlobalObject & WalletMock;
}
