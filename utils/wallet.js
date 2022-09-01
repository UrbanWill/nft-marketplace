/* eslint-disable import/prefer-default-export */
import { MATIC_NETWORK } from "./constants";

/**
 * @function changeNetwork
 * @return { Promise<Object> }
 */

export const changeNetwork = async () => {
  if (!window.ethereum) return null;
  return window.ethereum.request({
    method: "wallet_addEthereumChain",
    params: [MATIC_NETWORK],
  });
};
