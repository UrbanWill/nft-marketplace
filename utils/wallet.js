/* eslint-disable import/prefer-default-export */

/**
 * @function changeNetwork
 * @return { Promise<Object> }
 */

export const changeNetwork = () => {
  if (!window.ethereum) return null;
  return window.ethereum.request({
    method: "wallet_addEthereumChain",
    params: [
      {
        chainId: "0x13881",
        rpcUrls: ["https://matic-mumbai.chainstacklabs.com/"],
        chainName: "Matic Test net",
        nativeCurrency: {
          name: "MATIC",
          symbol: "MATIC",
          decimals: 18,
        },
        blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
      },
    ],
  });
};
