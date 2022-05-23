import {Wallet} from "../interfaces";

export const getMetamaskVersion = async (wallet: Wallet): Promise<string> => await wallet.request({
  method: 'web3_clientVersion',
  params: [],
}) as string;

export const isNewerVersion = (current: string, comparingWith: string): boolean => {
  if (current === comparingWith) return false;

  const regex = /[^\d.]/g;
  const currentFragments = current.replace(regex, '').split('.');
  const comparingWithFragments = comparingWith.replace(regex, '').split('.');

  const length =
        currentFragments.length > comparingWithFragments.length ?
          currentFragments.length : comparingWithFragments.length;
  for (let i = 0; i < length; i++) {
    if ((Number(currentFragments[i]) || 0) === (Number(comparingWithFragments[i]) || 0)) continue;
    return (Number(comparingWithFragments[i]) || 0) > (Number(currentFragments[i]) || 0);
  }

  return true;
};
