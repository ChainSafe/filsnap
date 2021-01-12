declare module "@filecoin-shipyard/lotus-client-rpc" {
    import {Schema} from "@filecoin-shipyard/lotus-client-schema";
    import {BrowserProvider} from "@filecoin-shipyard/lotus-client-provider-nodejs";

    export class LotusRPC {
        constructor(provider: BrowserProvider, options: {schema: Schema});
        callSchemaMethod: (method: unknown, schemaMethod: unknown, ...args: unknown[]) => Promise<unknown>;
        callSchemaMethodSub: (method: unknown, schemaMethod: unknown, ...args: unknown[]) => unknown;
        importFile(body: unknown): string;
        destroy(): void;
    }
}