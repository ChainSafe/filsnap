import {Wallet} from "../../src/interfaces";
import sinon from "sinon";

export class WalletMock implements Wallet {
  public readonly registerRpcMessageHandler = sinon.stub();
  public readonly rpcStubs = {
    snap_getState: sinon.stub(),
    snap_updateState: sinon.stub(),
    snap_getAppKey: sinon.stub(),
  }
  public readonly requestStub = sinon.stub()
  public readonly request = (args: { method: string, params: unknown[] }) => {
    const { method, params = [] } = args;
    if (Object.hasOwnProperty.call(this.rpcStubs, method)) {
      return (this.rpcStubs as any)[method](...params)
    }
    return this.requestStub(args)
  }

  public reset(): void {
    this.registerRpcMessageHandler.reset();
    this.requestStub.reset();
    Object.values(this.rpcStubs).forEach(
      (stub: ReturnType<typeof sinon.stub>) => stub.reset()
    );
  }
}
