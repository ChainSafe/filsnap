export interface LotusRpcApi {
    version(): Promise<VersionResponse>
    walletBalance(address: string): Promise<string>
}

type VersionResponse = { APIVersion: number; BlockDelay: number; Version: string }