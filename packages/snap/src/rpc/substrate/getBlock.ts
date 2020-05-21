import ApiPromise from "@polkadot/api/promise";
import {BlockHash} from '@polkadot/types/interfaces/chain';
import {BlockId, BlockInfo} from "@nodefactory/metamask-polkadot-types";

async function _getBlock(blockHash: BlockHash|string, api: ApiPromise): Promise<BlockInfo> {
  const signedBlock = await api.rpc.chain.getBlock(blockHash);
  return {
    hash: signedBlock.block.hash.toHex(),
    number: signedBlock.block.header.number.toString()
  };
}

async function _getBlockById(blockId: number, api: ApiPromise): Promise<BlockInfo | null> {
  const blockHash = await api.rpc.chain.getBlockHash(blockId);
  if (!blockHash.isEmpty) {
    return await _getBlock(blockHash, api);
  }
  return null;
}

/**
 * Returns block based on blockTag passed as param.
 *
 * Supported tags are:
 *    block id    (as string or number)
 *    block hash  (as hex string starting with "0x")
 *    "latest"    (returning latest block)
 *
 * @param blockTag
 * @param api
 */
export async function getBlock(blockTag: BlockId, api: ApiPromise): Promise<BlockInfo | null> {
  switch (typeof blockTag) {
    case "number":
      // get block by id sent as number
      return await _getBlockById(blockTag, api);
    case "string":
      if (blockTag === "latest") {
        // get latest block
        const h = await api.rpc.chain.getHeader();
        return await _getBlock(h.hash, api);
      } else if (blockTag.startsWith("0x")) {
        // get block by hash
        return await _getBlock(blockTag, api);
      } else {
        // get block by id sent as string
        const blockId = parseInt(blockTag);
        if (blockId) {
          return await _getBlockById(blockId, api);
        }
      }
  }
  return null;
}


