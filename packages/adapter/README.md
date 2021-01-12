# FilSnap adapter
![](https://github.com/nodefactoryio/filecoin-metamask-snap/workflows/ci/badge.svg)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
![](https://img.shields.io/badge/yarn-%3E%3D1.17.0-orange.svg?style=flat-square)
![Discord](https://img.shields.io/discord/608204864593461248?color=blue&label=Discord&logo=discord)

FilSnap adapter is used to install Filecoin snap and expose API toward snap.

For more details on Filecoin snap itself see [snap repo](https://github.com/NodeFactoryIo/filecoin-metamask-snap) or read full [Filecoin snap documentation](https://github.com/NodeFactoryIo/filecoin-metamask-snap/wiki).

## Usage

Adapter has only exposed function for installing Filecoin snap.

```typescript
async function enableFilecoinSnap(
  config: Partial<SnapConfig>, 
  pluginOrigin?: string
): Promise<MetamaskFilecoinSnap> 
```

On snap installation, it is possible to send full or partial configuration.
If you only provide `network` property a predefined configuration for the specified network will be used.
Other properties are optional but will override default values if provided.

Below you can see structure of config object:

```typescript
export interface SnapConfig {
  derivationPath: string;
  token: string;
  network: FilecoinNetwork; // "f" || "t"
  rpcUrl: string;
  unit?: UnitConfiguration;
}

export interface UnitConfiguration {
  symbol: string;
  decimals: number;
  image?: string;
  customViewUrl?: string;
}
```

After snap installation, this function returns `MetamaskFilecoinSnap` object that can be used to retrieve snap API. 
An example of initializing Filecoin snap and invoking snap API is shown below.

```typescript
// install snap and fetch API
const snap = await enableFilecoinSnap({network: "t"});
const api = await metamaskFilecoinSnap.getFilecoinSnapApi();

// invoke API
const address = await api.getAddress();

console.log(`Snap installed, account generated with address: ${address}`);
```