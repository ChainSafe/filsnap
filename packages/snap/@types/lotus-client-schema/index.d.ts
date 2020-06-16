declare module "@filecoin-shipyard/lotus-client-schema" {

    export type Schema = {
        methods: any;
    }

    interface testnet {
        fullNode: Schema;
        storageMiner: Schema;
    }

    export const testnet: testnet;
}