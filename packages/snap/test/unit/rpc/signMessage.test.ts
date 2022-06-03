import {WalletMock} from "../wallet.mock.test";
import chai, {expect} from "chai";
import sinonChai from "sinon-chai";
import {MessageRequest} from "@chainsafe/filsnap-types";
import {Message} from "@zondax/filecoin-signing-tools/js";
import {signMessage} from "../../../src/rpc/signMessage";
import {LotusApiMock} from "../lotusapi.mock.test";

chai.use(sinonChai);

describe('Test rpc handler function: signMessage', function () {
  const walletStub = new WalletMock();
  const apiStub = new LotusApiMock();

  const messageRequest: MessageRequest = {
    to: "t12flyjpedjjqlrr2dmlnrtbh62qav3b3h7o7lohy",
    value: "5000000000000000",
  };

  const fullMessage: Message = {
    ...messageRequest,
    from: "f1ekszptik2ognlx24xz7zubejtw3cyidv4t4ibyy",
    gasfeecap: "10",
    gaslimit: 1000,
    gaspremium: "10",
    method: 0,
    nonce: 0,
    params: ""
  };

  const paramsMessage: Message = {
    ...messageRequest,
    from: "f1ekszptik2ognlx24xz7zubejtw3cyidv4t4ibyy",
    gasfeecap: "10",
    gaslimit: 1000,
    gaspremium: "10",
    method: 0,
    nonce: 0,
    params: "bugugugu",
  };

  afterEach(function() {
    walletStub.reset();
    apiStub.reset();
  });

  it('should successfully sign valid message without gas params on positive prompt', async function () {
    walletStub.rpcStubs.snap_confirm.resolves(true);
    walletStub.prepareFoKeyPair();

    apiStub.mpoolGetNonce.returns("0");
    apiStub.gasEstimateGasLimit.returns(1000);
    apiStub.gasEstimateMessageGas.returns({GasPremium: "10", GasFeeCap: "10"});

    const response = await signMessage(walletStub, apiStub, messageRequest);

    expect(walletStub.rpcStubs.snap_confirm).to.have.been.calledOnce;
    expect(walletStub.rpcStubs.snap_getBip44Entropy_461).to.have.been.calledOnce;
    expect(walletStub.rpcStubs.snap_manageState).to.have.been.calledOnce;
    expect(apiStub.mpoolGetNonce).to.have.been.calledOnce;
    expect(apiStub.gasEstimateGasLimit).to.have.been.calledOnce;
    expect(apiStub.gasEstimateMessageGas).to.have.been.calledOnce;
    expect(response.signedMessage.message).to.be.deep.eq(fullMessage);
    expect(response.signedMessage.signature.data).to.not.be.empty;
    expect(response.signedMessage.signature.type).to.be.eq(1);
  });

  it('should successfully sign valid message with gas params on positive prompt', async function () {
    walletStub.rpcStubs.snap_confirm.resolves(true);
    walletStub.prepareFoKeyPair();

    apiStub.mpoolGetNonce.returns("0");

    const messageRequestWithGasParams: MessageRequest = {
      ...messageRequest,
      gasfeecap: "10",
      gaslimit: 1000,
      gaspremium: "10",
      nonce: 1
    };
    const response = await signMessage(walletStub, apiStub, messageRequestWithGasParams);

    expect(walletStub.rpcStubs.snap_confirm).to.have.been.calledOnce;
    expect(walletStub.rpcStubs.snap_getBip44Entropy_461).to.have.been.calledOnce;
    expect(walletStub.rpcStubs.snap_manageState).to.have.been.calledOnce;
    expect(response.signedMessage.message).to.be.deep.eq({...fullMessage, nonce: 1});
    expect(apiStub.mpoolGetNonce).to.have.not.been.called;
    expect(response.signedMessage.signature.data).to.not.be.empty;
    expect(response.signedMessage.signature.type).to.be.eq(1);
  });

  it('should successfully sign valid message with custom params on positive prompt', async function () {
    walletStub.rpcStubs.snap_confirm.resolves(true);
    walletStub.prepareFoKeyPair();
    apiStub.mpoolGetNonce.returns("0");
    apiStub.gasEstimateGasLimit.returns(1000);
    apiStub.gasEstimateMessageGas.returns({GasFeeCap: "10", GasPremium: "10"});

    const messageRequestWithCustomParams: MessageRequest = {
      ...messageRequest,
      params: "bugugugu",
    };
    const response = await signMessage(walletStub, apiStub, messageRequestWithCustomParams);

    expect(walletStub.rpcStubs.snap_confirm).to.have.been.calledOnce;
    expect(walletStub.rpcStubs.snap_getBip44Entropy_461).to.have.been.calledOnce;
    expect(walletStub.rpcStubs.snap_manageState).to.have.been.calledOnce;
    expect(apiStub.mpoolGetNonce).to.have.been.calledOnce;
    expect(apiStub.gasEstimateGasLimit).to.have.been.calledOnce;
    expect(apiStub.gasEstimateMessageGas).to.have.been.calledOnce;
    expect(response.signedMessage.message).to.be.deep.eq(paramsMessage);
    expect(response.signedMessage.signature.data).to.not.be.empty;
    expect(response.signedMessage.signature.type).to.be.eq(1);
  });

  it('should cancel signing on negative prompt', async function () {
    walletStub.rpcStubs.snap_confirm.resolves(false);
    walletStub.prepareFoKeyPair();

    apiStub.mpoolGetNonce.returns("0");
    const messageRequestWithGasParams: MessageRequest = {
      ...messageRequest,
      gasfeecap: "10",
      gaslimit: 1000,
      gaspremium: "10"
    };

    const response = await signMessage(walletStub, apiStub, messageRequestWithGasParams);

    expect(walletStub.rpcStubs.snap_confirm).to.have.been.calledOnce;
    expect(walletStub.rpcStubs.snap_getBip44Entropy_461).to.have.been.calledOnce;
    expect(walletStub.rpcStubs.snap_manageState).to.have.been.calledOnce;
    expect(response.signedMessage).to.be.null;
    expect(response.error).to.be.null;
    expect(response.confirmed).to.be.false;
  });

  it('should fail signing on invalid message ', async function () {
    walletStub.rpcStubs.snap_confirm.resolves(true);
    walletStub.prepareFoKeyPair();

    const invalidMessage = messageRequest;
    invalidMessage.value = "-5000000000000000";

    apiStub.mpoolGetNonce.returns("0");

    const response = await signMessage(walletStub, apiStub, invalidMessage);

    expect(response.signedMessage).to.be.null;
    expect(response.error).to.not.be.null;
    expect(response.confirmed).to.be.false;
  });
});