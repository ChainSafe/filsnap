import chai, {expect} from "chai";
import sinonChai from "sinon-chai";
import {WalletMock} from "../wallet.mock.test";
import {testAddress} from "../rpc/keyPairTestConstants";
import {updateTxInState} from "../../../src/filecoin/tx";
import {Transaction} from "@nodefactory/metamask-filecoin-types";

chai.use(sinonChai);

describe('Test account function: getKeyPair', function() {

    const walletStub = new WalletMock();

    // @ts-ignore
    const tx: Transaction = {
        block: "",
        fee: "",
        hash: "0x1",
        amount: "100",
        destination: testAddress,
        sender: testAddress
    };

    afterEach(function() {
        walletStub.reset();
    });

    it('should add transaction to state if empty state', function () {
        walletStub.getPluginState.returns({filecoin: {config: {network: "f"}, transactions: []}});
        walletStub.updatePluginState.returnsArg(0);

        updateTxInState(walletStub, tx);

        expect(walletStub.getPluginState).to.have.been.calledOnce;
        expect(walletStub.updatePluginState).to.have.been.calledOnceWith({filecoin: {config: {network: "f"}, transactions: [tx]}})
    });

    it('should add transaction to state if same hash transaction is not saved', function () {
        const differentTx = {...tx, hash: "0x2"};

        walletStub.getPluginState.returns({filecoin: {config: {network: "f"}, transactions: [differentTx]}});
        walletStub.updatePluginState.returnsArg(0);

        updateTxInState(walletStub, tx);

        expect(walletStub.getPluginState).to.have.been.calledOnce;
        expect(walletStub.updatePluginState).to.have.been.calledOnceWith({filecoin: {config: {network: "f"}, transactions: [differentTx, tx]}})

    });

    it('should update transaction if same hash transaction already in state', function () {
        walletStub.getPluginState.returns({filecoin: {config: {network: "f"}, transactions: [tx]}});
        walletStub.updatePluginState.returnsArg(0);

        const updatedTx = {...tx, block: "1"};

        updateTxInState(walletStub, updatedTx);

        expect(walletStub.getPluginState).to.have.been.calledOnce;
        expect(walletStub.updatePluginState).to.have.been.calledOnceWith({filecoin: {config: {network: "f"}, transactions: [updatedTx]}})
    });

});
