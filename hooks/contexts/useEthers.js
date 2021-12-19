import { createContext, useContext, useState, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";

import NFT from "../../artifacts/contracts/NFT.sol/NFT.json";
import Market from "../../artifacts/contracts/NFTMarket.sol/NFTMarket.json";
import { nftaddress, nftmarketaddress } from "../../config";

const EthersContext = createContext();

/**
 * Context function that handles dynamic contract related values
 * @returns {
 * {signedMarketContract: signed market contract | null}}
 */
const useEthers = () => {
  const { active, account, library } = useWeb3React();
  const [signer, setSigner] = useState(null);
  const [signedMarketContract, setSignedMarketContract] = useState(null);

  // Clears signer and signed contracts
  const handleClear = () => {
    setSigner(null);
    setSignedMarketContract(null);
  };

  useEffect(() => {
    if (active) {
      return setSigner(library.getSigner(account));
    }
    return handleClear();
  }, [active, account, library]);

  useEffect(() => {
    if (signer) {
      const contract = new ethers.Contract(
        nftmarketaddress,
        Market.abi,
        signer
      );
      setSignedMarketContract(contract);
    }
  }, [signer]);

  return { signedMarketContract };
};

// Static contract values
const provider = new ethers.providers.JsonRpcProvider();
const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider);
const marketContract = new ethers.Contract(
  nftmarketaddress,
  Market.abi,
  provider
);

// Context provider
export const EthersProvider = ({ children }) => {
  const values = { ...useEthers(), tokenContract, marketContract };
  return (
    <EthersContext.Provider value={values}>{children}</EthersContext.Provider>
  );
};

// Export context to be able to use them in child component
export default () => useContext(EthersContext);
