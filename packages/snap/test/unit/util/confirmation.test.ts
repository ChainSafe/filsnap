import chai, {expect} from "chai";
import sinonChai from "sinon-chai";
import {WalletMock} from "../wallet.mock.test";
import {showConfirmationDialog} from "../../../src/util/confirmation";

chai.use(sinonChai);

describe('Test showConfirmationDialog', function() {

  const walletStub = new WalletMock();

  afterEach(() => {
    walletStub.reset();
  });

  it('should return true on positive confirmation', async function () {
    walletStub.send.returns(true);
    const result = await showConfirmationDialog(walletStub, "confirmation");
    expect(walletStub.send).to.have.been.calledOnceWith(
      { method: 'confirm', params: ["confirmation"] }
    );
    expect(result).to.be.eq(true);
  });

  it('should return false on negative confirmation', async function () {
    walletStub.send.returns(false);
    const result = await showConfirmationDialog(walletStub, "confirmation");
    expect(walletStub.send).to.have.been.calledOnceWith(
      { method: 'confirm', params: ["confirmation"] }
    );
    expect(result).to.be.eq(false);
  });

});
