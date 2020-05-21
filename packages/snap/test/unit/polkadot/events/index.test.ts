import chai, {expect} from "chai";
import sinonChai from "sinon-chai";
import {polkadotEventEmitter} from "../../../../src/polkadot/events";
import sinon from "sinon";

chai.use(sinonChai);

describe('Test polkadotEventEmitter', function() {

  describe('Single origin tests', function () {
    const callbackStub = sinon.stub();

    beforeEach(function () {
      callbackStub.returnsArg(0);
    });

    afterEach(function () {
      polkadotEventEmitter.removeAllListeners("onBalanceChange", "origin1");
      callbackStub.reset();
    });

    it('should call callback only when it is subscribed', function() {
      polkadotEventEmitter.addListener(
        "onBalanceChange", "origin1", callbackStub
      );
      polkadotEventEmitter.emit("onBalanceChange", "origin1", "arg");
      expect(callbackStub).to.have.been.calledOnceWith("arg");
      polkadotEventEmitter.removeAllListeners("onBalanceChange", "origin1");
      polkadotEventEmitter.emit("onBalanceChange", "origin1", "arg");
      expect(callbackStub).to.have.been.calledOnce;
    });

    it('should call callback multiple times on mutiple emits', function() {
      polkadotEventEmitter.addListener(
        "onBalanceChange", "origin1", callbackStub
      );
      polkadotEventEmitter.emit("onBalanceChange", "origin1", "arg");
      expect(callbackStub).to.have.been.calledOnceWith("arg");
      polkadotEventEmitter.emit("onBalanceChange", "origin1", "arg");
      expect(callbackStub).to.have.been.calledTwice;
      polkadotEventEmitter.removeAllListeners("onBalanceChange", "origin1");
      polkadotEventEmitter.emit("onBalanceChange", "origin1", "arg");
      expect(callbackStub).to.have.been.calledTwice;
    });

    it('should call multiple callbacks on emit', function() {
      polkadotEventEmitter.addListener(
        "onBalanceChange", "origin1", callbackStub
      );
      // add second callback on same origin
      const additionalCallbackStub = sinon.stub();
      additionalCallbackStub.returnsArg(0);
      polkadotEventEmitter.addListener(
        "onBalanceChange", "origin1", additionalCallbackStub
      );
      polkadotEventEmitter.emit("onBalanceChange", "origin1", "arg");
      expect(callbackStub).to.have.been.calledOnceWith("arg");
      expect(additionalCallbackStub).to.have.been.calledOnceWith("arg");
    });

    it('should remove all callbacks on same origin', function() {
      polkadotEventEmitter.addListener(
        "onBalanceChange", "origin1", callbackStub
      );
      // add second callback on same origin
      const additionalCallbackStub = sinon.stub();
      additionalCallbackStub.returnsArg(0);
      polkadotEventEmitter.addListener(
        "onBalanceChange", "origin1", additionalCallbackStub
      );
      polkadotEventEmitter.emit("onBalanceChange", "origin1", "arg");
      expect(callbackStub).to.have.been.calledOnceWith("arg");
      expect(additionalCallbackStub).to.have.been.calledOnceWith("arg");
      polkadotEventEmitter.removeAllListeners("onBalanceChange", "origin1");
      // callbacks are removed and wont be called second time
      polkadotEventEmitter.emit("onBalanceChange", "origin1", "arg");
      expect(callbackStub).to.have.been.calledOnceWith("arg");
      expect(additionalCallbackStub).to.have.been.calledOnceWith("arg");
    });

    it('should fail to emit on no listeners subscribed', function () {
      const success = polkadotEventEmitter.emit("onBalanceChange", "origin1", "arg");
      expect(success).to.be.false;
    });
  });

  describe('Multiple origins tests', function () {

    afterEach(function () {
      polkadotEventEmitter.removeAllListeners("onBalanceChange", "origin1");
      polkadotEventEmitter.removeAllListeners("onBalanceChange", "origin2");
    });

    it('should call only callback specific origin on emit', function() {
      const firstOriginCallback = sinon.stub();
      polkadotEventEmitter.addListener(
        "onBalanceChange", "origin1", firstOriginCallback
      );
      const secondOriginCallback = sinon.stub();
      polkadotEventEmitter.addListener(
        "onBalanceChange", "origin2", secondOriginCallback
      );
      polkadotEventEmitter.emit("onBalanceChange", "origin1", "arg");
      expect(firstOriginCallback).to.have.been.calledOnceWith("arg");
      expect(secondOriginCallback).to.not.have.been.called;

      polkadotEventEmitter.emit("onBalanceChange", "origin2", "arg");
      expect(firstOriginCallback).to.have.been.calledOnceWith("arg");
      expect(secondOriginCallback).to.have.been.calledOnceWith("arg");
    });



    it('should remove all listeners for one origin', function () {
      const firstOriginCallbackOne = sinon.stub();
      polkadotEventEmitter.addListener(
        "onBalanceChange", "origin1", firstOriginCallbackOne
      );
      const firstOriginCallbackTwo = sinon.stub();
      polkadotEventEmitter.addListener(
        "onBalanceChange", "origin1", firstOriginCallbackTwo
      );
      const secondOriginCallback = sinon.stub();
      polkadotEventEmitter.addListener(
        "onBalanceChange", "origin2", secondOriginCallback
      );

      polkadotEventEmitter.removeAllListeners("onBalanceChange", "origin1");

      polkadotEventEmitter.emit("onBalanceChange", "origin1", "arg");
      polkadotEventEmitter.emit("onBalanceChange", "origin2", "arg");

      expect(firstOriginCallbackOne).not.to.have.been.called;
      expect(firstOriginCallbackTwo).not.to.have.been.called;
      expect(secondOriginCallback).to.have.been.calledOnceWith("arg");
    });
  });
});
