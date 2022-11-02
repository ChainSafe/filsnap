import chai, { expect } from "chai";
import sinonChai from "sinon-chai";
import { getPublicKey } from "../../../src/rpc/getPublicKey";
import { mockSnapProvider } from "../wallet.mock.test";
import { testPublicKey } from "./keyPairTestConstants";

chai.use(sinonChai);

describe("Test rpc handler function: getPublicKey", function () {
  const walletStub = mockSnapProvider();

  afterEach(function () {
    walletStub.reset();
  });

  it("should return valid address", async function () {
    walletStub.prepareFoKeyPair();

    const result = await getPublicKey(walletStub);

    expect(result).to.be.eq(testPublicKey);
    expect(walletStub.rpcStubs.snap_manageState).to.have.been.calledOnce;
    expect(walletStub.rpcStubs.snap_getBip44Entropy).to.have.been.calledOnce;
  });
});
