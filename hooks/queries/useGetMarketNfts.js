import { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import formatItem from "../../utils/formatItem";

import useEthers from "../contexts/useEthers";

/**
 * hook to get nfts for sale
 * @returns { nfts: [] | array of objects, isLoading: boolean }
 */
const useGetMarketNfts = () => {
  const [nfts, setNfts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { tokenContract, marketContract } = useEthers();

  const loadNFTs = useCallback(async () => {
    setIsLoading(true);

    const data = await marketContract.fetchMarketItems().catch((error) => {
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
      setNfts(formattedItems.reverse());
    }

    setIsLoading(false);
  }, [marketContract, tokenContract]);

  useEffect(() => {
    loadNFTs();
  }, [loadNFTs]);

  return {
    data: nfts,
    isLoading,
    refetch: loadNFTs,
  };
};

export default useGetMarketNfts;
