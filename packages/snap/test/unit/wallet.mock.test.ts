import {Wallet} from "../../src/interfaces";
import sinon from "sinon";
import {testNewBip44Entropy, testNewMetamaskVersion} from "./rpc/keyPairTestConstants";
import {SnapConfig} from "@chainsafe/filsnap-types";

export class WalletMock implements Wallet {
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
  public request(args: { method: string, params: unknown[] }): unknown {
    const { method, params = [] } = args;
    if (Object.hasOwnProperty.call(this.rpcStubs, method)) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (this.rpcStubs as any)[method](...params);
    }
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
    this.rpcStubs.snap_manageState
      .withArgs('get')
      .resolves({filecoin: {config: {derivationPath: "m/44'/461'/0'/0/0", network: "f"} as SnapConfig}});
    this.rpcStubs.snap_getBip44Entropy_461.resolves(testNewBip44Entropy);
    this.rpcStubs.web3_clientVersion.resolves(testNewMetamaskVersion);
  }
}
