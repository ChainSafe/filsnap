declare module "@filecoin-shipyard/lotus-client-rpc" {
    import {Schema} from "@filecoin-shipyard/lotus-client-schema";
    import {BrowserProvider} from "@filecoin-shipyard/lotus-client-provider-nodejs";

    export class LotusRPC {
        constructor(provider: BrowserProvider, options: {schema: Schema});
    }
}