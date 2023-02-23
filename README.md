# FilSnap
![](https://github.com/chainsafe/filsnap/workflows/ci/badge.svg)
![](https://img.shields.io/badge/yarn-%3E%3D3-orange)
![](https://img.shields.io/badge/Node.js-%3E%3D16-orange)

Snap to enable MetaMask users interaction with filecoin dapps. For detailed documentation and integration instructions see our [wiki](https://github.com/chainsafe/filsnap/wiki).

## Testing FilSnap

### MetaMask Flask
Snaps is pre-release software available in MetaMask Flask, a canary distribution for developers that provides access to upcoming features. To try Snaps [install MetaMask Flask](https://metamask.io/flask/).

### Live demo dapp
Test FilSnap inside [our demo dapp](http://filsnap.chainsafe.io/).

## Development

### Requirements
```
node version 16 or above
```

### Usage
* For nvm users
```sh
nvm use
```
---
* Enable corepack
```sh
corepack enable
```
* Install packages
```sh
yarn install
```
* Run local snap server and React Demo page 
```sh
yarn demo
```

## License
This project is dual-licensed under Apache 2.0 and MIT terms:
- Apache License, Version 2.0, ([LICENSE-APACHE](LICENSE-APACHE) or http://www.apache.org/licenses/LICENSE-2.0)
- MIT license ([LICENSE-MIT](LICENSE-MIT) or http://opensource.org/licenses/MIT)
