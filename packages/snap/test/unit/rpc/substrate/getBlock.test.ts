import chai, {expect} from "chai";
import sinonChai from "sinon-chai";
import {WalletMock} from "../../wallet.mock.test";
import ApiPromise from "@polkadot/api/promise";
import sinon from "sinon";
import {getBlock} from "../../../../src/rpc/substrate/getBlock";
import { BlockHash } from '@polkadot/types/interfaces';
import { H256 } from '@polkadot/types/interfaces/runtime';
import { hexToU8a } from '@polkadot/util';

chai.use(sinonChai);

describe('Test rpc handler function: getBlock', function() {

  const walletStub = new WalletMock();

  afterEach(function() {
    walletStub.reset();
  });

  it('should return block on block id as number', async function () {
    // api stub
    const apiStub = {rpc: {chain: {getBlock: sinon.stub(), getBlockHash: sinon.stub()}}};
    apiStub.rpc.chain.getBlockHash.returns(
      hexToU8a("0xc9fb400866641ca80ef3e760d904fe15a8c9eda6ff1bd769b0628e26e82d5c75") as BlockHash
    );
    // eslint-disable-next-line max-len
    apiStub.rpc.chain.getBlock.returns({block:{hash: {toHex: (): string => "0xc9fb400866641ca80ef3e760d904fe15a8c9eda6ff1bd769b0628e26e82d5c75"}, header: {number: 10}}});
    const api = apiStub as unknown as ApiPromise;
    const result = await getBlock(1, api);
    expect(result).not.to.be.null;
    expect(result.hash).to.be.eq("0xc9fb400866641ca80ef3e760d904fe15a8c9eda6ff1bd769b0628e26e82d5c75");
    expect(result.number).to.be.eq("10");
    expect(apiStub.rpc.chain.getBlockHash).to.have.been.calledOnceWith(1);
    // eslint-disable-next-line max-len
    expect(apiStub.rpc.chain.getBlock).to.have.been.calledOnceWith(hexToU8a("0xc9fb400866641ca80ef3e760d904fe15a8c9eda6ff1bd769b0628e26e82d5c75") as BlockHash);
  });

  it('should return block on block id as string', async function () {
    // api stub
    const apiStub = {rpc: {chain: {getBlock: sinon.stub(), getBlockHash: sinon.stub()}}};
    apiStub.rpc.chain.getBlockHash.returns(
      hexToU8a("0xc9fb400866641ca80ef3e760d904fe15a8c9eda6ff1bd769b0628e26e82d5c75") as BlockHash
    );
    // eslint-disable-next-line max-len
    apiStub.rpc.chain.getBlock.returns({block:{hash: {toHex: (): string => "0xc9fb400866641ca80ef3e760d904fe15a8c9eda6ff1bd769b0628e26e82d5c75"}, header: {number: 10}}});
    const api = apiStub as unknown as ApiPromise;
    const result = await getBlock("1", api);
    expect(result).not.to.be.null;
    expect(result.hash).to.be.eq("0xc9fb400866641ca80ef3e760d904fe15a8c9eda6ff1bd769b0628e26e82d5c75");
    expect(result.number).to.be.eq("10");
    expect(apiStub.rpc.chain.getBlockHash).to.have.been.calledOnceWith(1);
    // eslint-disable-next-line max-len
    expect(apiStub.rpc.chain.getBlock).to.have.been.calledOnceWith(hexToU8a("0xc9fb400866641ca80ef3e760d904fe15a8c9eda6ff1bd769b0628e26e82d5c75") as BlockHash);
  });

  it('should return block on block hash as string', async function () {
    // api stub
    const apiStub = {rpc: {chain: {getBlock: sinon.stub()}}};
    apiStub.rpc.chain.getBlock.returns({});
    // eslint-disable-next-line max-len
    apiStub.rpc.chain.getBlock.returns({block:{hash: {toHex: (): string => "0xc9fb400866641ca80ef3e760d904fe15a8c9eda6ff1bd769b0628e26e82d5c75"}, header: {number: 10}}});
    const api = apiStub as unknown as ApiPromise;
    // eslint-disable-next-line max-len
    const result = await getBlock("0xc9fb400866641ca80ef3e760d904fe15a8c9eda6ff1bd769b0628e26e82d5c75", api);
    expect(result).not.to.be.null;
    expect(result.hash).to.be.eq("0xc9fb400866641ca80ef3e760d904fe15a8c9eda6ff1bd769b0628e26e82d5c75");
    expect(result.number).to.be.eq("10");
    // eslint-disable-next-line max-len
    expect(apiStub.rpc.chain.getBlock).to.have.been.calledOnceWith("0xc9fb400866641ca80ef3e760d904fe15a8c9eda6ff1bd769b0628e26e82d5c75");
  });

  it('should return latest block on "latest" as parameter', async function () {
    // api stub
    const apiStub = {rpc: {chain: {getBlock: sinon.stub(), getHeader: sinon.stub()}}};
    apiStub.rpc.chain.getBlock.returns({});
    // eslint-disable-next-line max-len
    apiStub.rpc.chain.getBlock.returns({block:{hash: {toHex: (): string => "0xc9fb400866641ca80ef3e760d904fe15a8c9eda6ff1bd769b0628e26e82d5c75"}, header: {number: 10}}});
    // eslint-disable-next-line max-len
    apiStub.rpc.chain.getHeader.returns({hash: hexToU8a("0xc9fb400866641ca80ef3e760d904fe15a8c9eda6ff1bd769b0628e26e82d5c75") as H256});
    const api = apiStub as unknown as ApiPromise;
    const result = await getBlock("latest", api);
    expect(result).not.to.be.null;
    expect(result.hash).to.be.eq("0xc9fb400866641ca80ef3e760d904fe15a8c9eda6ff1bd769b0628e26e82d5c75");
    expect(result.number).to.be.eq("10");
    expect(apiStub.rpc.chain.getHeader).to.have.been.calledOnce;
    // eslint-disable-next-line max-len
    expect(apiStub.rpc.chain.getBlock).to.have.been.calledOnceWith(hexToU8a("0xc9fb400866641ca80ef3e760d904fe15a8c9eda6ff1bd769b0628e26e82d5c75") as BlockHash);
  });

  it('should return null on invalid string as parameter', async function () {
    const api = {} as unknown as ApiPromise;
    const result = await getBlock("zz", api);
    expect(result).to.be.null;
  });

  it('should return null on empty parameters object', async function () {
    const api = {} as unknown as ApiPromise;
    const result = await getBlock(null, api);
    expect(result).to.be.null;
  });

});
