import { Message, MessageStatus } from "@chainsafe/filsnap-types";
import chai, { expect } from "chai";
import sinonChai from "sinon-chai";
import { updateMessageInState } from "../../../src/filecoin/message";
import { testAddress } from "../rpc/keyPairTestConstants";
import { mockSnapProvider } from "../wallet.mock.test";

chai.use(sinonChai);

describe("Test saving transactions in state", function () {
  const walletStub = mockSnapProvider();

  const message = {
    cid: "a1b2c3ee",
    message: {
      from: testAddress,
      gasfeecap: "10",
      gaslimit: 1000,
      gaspremium: "10",
      method: 0,
      nonce: 1,
      to: testAddress,
      value: "100",
    } as Message,
  } as MessageStatus;

  afterEach(function () {
    walletStub.reset();
  });

  it("should add transaction to state if empty state", async function () {
    walletStub.rpcStubs.snap_manageState
      .withArgs({ operation: 'get' })
      .resolves({ filecoin: { config: { network: "f" }, messages: [] } });

    walletStub.rpcStubs.snap_manageState
      .withArgs(
        {
          newState: {
            filecoin: { config: { network: "f" }, messages: [message] },
          }, operation: 'update'
        }
      )
      .resolves();

    await updateMessageInState(walletStub, message);

    expect(walletStub.rpcStubs.snap_manageState).to.have.been.calledWithExactly(
      {
        newState: {
          filecoin: { config: { network: "f" }, messages: [message] },
        }, operation: 'update'
      }
    );
    expect(walletStub.rpcStubs.snap_manageState).to.have.been.calledTwice;
  });

  it("should add transaction to state if same hash transaction is not saved", async function () {
    const differentTx = { ...message, cid: "abc123" };

    walletStub.rpcStubs.snap_manageState.withArgs({ operation: 'get' }).resolves({
      filecoin: { config: { network: "f" }, messages: [differentTx] },
    });

    walletStub.rpcStubs.snap_manageState
      .withArgs(
        {
          newState: {
            filecoin: {
              config: { network: "f" },
              messages: [differentTx, message],
            },
          }, operation: 'update'
        }
      )
      .resolves();

    await updateMessageInState(walletStub, message);

    expect(walletStub.rpcStubs.snap_manageState).to.have.been.calledWithExactly(
      {
        newState: {
          filecoin: {
            config: { network: "f" },
            messages: [differentTx, message],
          },
        }, operation: 'update'
      }
    );
  });

  it("should update transaction if same hash transaction already in state", async function () {
    const updatedTx = { ...message };
    updatedTx.message.nonce = 2;

    walletStub.rpcStubs.snap_manageState.withArgs({ operation: 'get' }).resolves({
      filecoin: { config: { network: "f" }, messages: [message] },
    });

    walletStub.rpcStubs.snap_manageState
      .withArgs(
        {
          newState: {
            filecoin: { config: { network: "f" }, messages: [updatedTx] },
          }, operation: 'update'
        }
      )
      .resolves();

    await updateMessageInState(walletStub, updatedTx);

    expect(walletStub.rpcStubs.snap_manageState).to.have.been.calledTwice;
    expect(walletStub.rpcStubs.snap_manageState).to.have.been.calledWithExactly(
      {
        newState: {
          filecoin: { config: { network: "f" }, messages: [updatedTx] },
        }, operation: 'update'
      }
    );
  });
});
