import chai, {expect} from "chai";
import sinonChai from "sinon-chai";
import {WalletMock} from "../wallet.mock.test";
import {testAddress} from "../rpc/keyPairTestConstants";
import {updateMessageInState} from "../../../src/filecoin/message";

chai.use(sinonChai);

describe('Test saving transactions in state', function() {

    const walletStub = new WalletMock();

    const message = {
        message: {
            to: testAddress,
            from: testAddress,
            nonce: 1,
            value: "100",
            method: 0,
            gaslimit: 1000,
            gasfeecap: "10",
            gaspremium: "10"
        },
        cid: "a1b2c3ee"
    };

    afterEach(function() {
        walletStub.reset();
    });

    it('should add transaction to state if empty state', async function () {
        walletStub.rpcStubs.snap_getState.resolves({filecoin: {config: {network: "f"}, messages: []}});
        walletStub.rpcStubs.snap_updateState.returnsArg(0);

        await updateMessageInState(walletStub, message);

        expect(walletStub.rpcStubs.snap_getState).to.have.been.calledOnce;
        expect(walletStub.rpcStubs.snap_updateState).to.have.been.calledOnceWith({filecoin: {config: {network: "f"}, messages: [message]}})
    });

    it('should add transaction to state if same hash transaction is not saved', async function () {
        const differentTx = {...message, cid: "abc123"};

        walletStub.rpcStubs.snap_getState.resolves({filecoin: {config: {network: "f"}, messages: [differentTx]}});
        walletStub.rpcStubs.snap_updateState.returnsArg(0);

        await updateMessageInState(walletStub, message);

        expect(walletStub.rpcStubs.snap_getState).to.have.been.calledOnce;
        expect(walletStub.rpcStubs.snap_updateState).to.have.been.calledOnceWith({filecoin: {config: {network: "f"}, messages: [differentTx, message]}})
    });

    it('should update transaction if same hash transaction already in state', async function () {
        walletStub.rpcStubs.snap_getState.resolves({filecoin: {config: {network: "f"}, messages: [message]}});
        walletStub.rpcStubs.snap_updateState.returnsArg(0);

        const updatedTx = {...message};
        updatedTx.message.nonce = 2;

        await updateMessageInState(walletStub, updatedTx);

        expect(walletStub.rpcStubs.snap_getState).to.have.been.calledOnce;
        expect(walletStub.rpcStubs.snap_updateState).to.have.been.calledOnceWith({filecoin: {config: {network: "f"}, messages: [updatedTx]}})
    });
});
