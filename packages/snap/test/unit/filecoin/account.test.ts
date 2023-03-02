import { SnapConfig } from "@chainsafe/filsnap-types";
import chai, { expect } from "chai";
import sinonChai from "sinon-chai";
import { getKeyPair } from "../../../src/filecoin/account";
import {
  testAddress,
  testBip44Entropy,
  testNewMetamaskVersion,
  testPrivateKeyBase64,
  testPublicKey,
} from "../rpc/keyPairTestConstants";
import { mockSnapProvider } from "../wallet.mock.test";

chai.use(sinonChai);

describe("Test account function: getKeyPair", function () {
  const walletStub = mockSnapProvider();

  afterEach(function () {
    walletStub.reset();
  });

  it("should return valid keypair for filecoin mainnnet with new version of metamask", async function () {
    walletStub.rpcStubs.snap_manageState.withArgs({ operation: 'get' }).resolves({
      filecoin: {
        config: {
          derivationPath: "m/44'/461'/0'/0/0",
          network: "f",
        } as SnapConfig,
      },
    });

    walletStub.rpcStubs.snap_getBip44Entropy.resolves(testBip44Entropy);
    walletStub.rpcStubs.web3_clientVersion.resolves(testNewMetamaskVersion);
    // ensure our call to getBip44Entropy returns the correct entropy
    walletStub.requestStub.resolves(testBip44Entropy);

    const result = await getKeyPair(walletStub);

    expect(result.publicKey).to.be.eq(testPublicKey);
    expect(result.address).to.be.eq(testAddress);
    expect(result.privateKey).to.be.eq(testPrivateKeyBase64);
  });
});
