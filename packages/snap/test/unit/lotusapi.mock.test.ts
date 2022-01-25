import sinon from "sinon";
import {LotusRpcApi} from "../../src/filecoin/types";

export class LotusApiMock implements LotusRpcApi {
    public version = sinon.stub();
    public walletBalance = sinon.stub();
    public mpoolGetNonce = sinon.stub();
    public stateCall = sinon.stub();
    public mpoolPush = sinon.stub();
    public gasEstimateMessageGas = sinon.stub();
    public gasEstimateFeeCap = sinon.stub();
    public gasEstimateGasLimit = sinon.stub();
    public stateNetworkName = sinon.stub();

    public reset(): void {
        this.version.reset();
        this.walletBalance.reset();
        this.mpoolGetNonce.reset();
        this.stateCall.reset();
        this.mpoolPush.reset();
        this.gasEstimateFeeCap.reset();
        this.gasEstimateGasLimit.reset();
        this.gasEstimateMessageGas.reset();
        this.stateNetworkName.reset();
    }
}