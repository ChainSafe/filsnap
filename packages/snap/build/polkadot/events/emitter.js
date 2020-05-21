"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class EventEmitterImplementation {
    constructor() {
        this.hasAttachedListeners = (event, identifier) => !!(this.listeners && this.listeners[identifier] && this.listeners[identifier][event]);
    }
    addListener(event, identifier, listener) {
        // create listeners structure if first call
        if (!this.listeners) {
            this.listeners = {
                [identifier]: {
                    [event]: []
                }
            };
        }
        // initialize slot for origin if it doesn't exist
        if (!this.listeners[identifier]) {
            this.listeners[identifier] = {
                [event]: []
            };
        }
        // initialize slot for event if it doesn't exist
        if (!this.listeners[identifier][event]) {
            this.listeners[identifier][event] = [];
        }
        // add listener
        this.listeners[identifier][event].push(listener);
        return this;
    }
    emit(event, identifier, arg) {
        if (this.hasAttachedListeners(event, identifier)) {
            this.listeners[identifier][event].forEach(callback => callback(arg));
            return this.listeners[identifier][event].length != 0;
        }
        return false;
    }
    removeListener(event, identifier, listener) {
        if (this.hasAttachedListeners(event, identifier)) {
            this.listeners[identifier][event] = this.listeners[identifier][event].filter(l => l != listener);
        }
        return this;
    }
    removeAllListeners(event, identifier) {
        if (this.hasAttachedListeners(event, identifier)) {
            this.listeners[identifier][event] = [];
        }
        return this;
    }
    getListenersCount(event, origin) {
        if (this.hasAttachedListeners(event, origin)) {
            return this.listeners[origin][event].length;
        }
        return 0;
    }
}
exports.EventEmitterImplementation = EventEmitterImplementation;
//# sourceMappingURL=emitter.js.map