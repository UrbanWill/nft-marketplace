import { useState, useEffect, useCallback } from "react";
import { useWeb3React } from "@web3-react/core";
import { toast } from "react-toastify";
import axios from "axios";
import formatItem from "../../utils/formatItem";

import useEthers from "../contexts/useEthers";

/**
 * hook to get nfts the connected wallet created
 * @returns { data: [] | array of objects, isLoading: boolean }
 */
const useGetCreatedNfts = () => {
  const [nfts, setNfts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { active } = useWeb3React();
  const { tokenContract, signedMarketContract } = useEthers();

  const loadNFTs = useCallback(async () => {
    setIsLoading(true);

    if (!active || !signedMarketContract || !tokenContract) {
      // Clears soldNfts when wallet is disconnected
      setNfts([]);
      setIsLoading(false);
      return;
    }

    const data = await signedMarketContract
      .fetchItemsCreated()
      .catch((error) => {
        toast.error(`${error}`);
        return null;
      });

    if (data) {
      const formattedItems = await Promise.all(
        data.map(async (item) => {
          const tokenUri = await tokenContract.tokenURI(item.tokenId);
          const meta = await axios.get(tokenUri);
          return formatItem(item, meta);
        })
      );
      setNfts(formattedItems);
    }

    setIsLoading(false);
  }, [signedMarketContract, tokenContract, active]);

  useEffect(() => {
    loadNFTs();
  }, [loadNFTs]);

  return {
    data: nfts,
    isLoading,
    refetch: loadNFTs,
  };
};

export default useGetCreatedNfts;
