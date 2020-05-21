import {WsProvider} from "@polkadot/api";
import ApiPromise from "@polkadot/api/promise";

(async function() {
  const provider = new WsProvider("wss://westend-rpc.polkadot.io");
  // const provider = new WsProvider("wss://kusama-rpc.polkadot.io");
  let api = new ApiPromise({ initWasm: false, provider, types: {RuntimeDbWeight: {
    read: 'Weight',
    write: 'Weight'
  }} });
  try {
    api = await api.isReady;
  } catch (e) {
    console.log("Api is ready with error:", e);
  }
  console.log((await api.query.system.account("5o96D5Nu589vP9FDDt967uxNYugQ8LEGfwdbpjcXVaZaGNmS")).data.free.toHuman());
})();