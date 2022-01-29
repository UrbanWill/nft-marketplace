import { useState, useEffect, useCallback } from "react";
import formatItem from "../../utils/formatItem";

import useEthers from "../contexts/useEthers";

/**
 * hook to get nft market history in marketContract
 * @returns { nftMarketHistory: [{MarketItem}] , isLoading: boolean, error: boolean }
 */

const useGetMarketNftHistory = (tokenId) => {
  const [nftMarketHistory, setNftMarketHistory] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const { marketContract } = useEthers();

  const GetMarketNft = useCallback(async () => {
    if (!marketContract || !tokenId) {
      return;
    }

    const marketNftHistory = await marketContract.fetchMarketItemHistory(
      tokenId
    );

    if (marketNftHistory) {
      const formattedItems = await Promise.all(
        marketNftHistory.map(async (item) => formatItem(item))
      );
      setNftMarketHistory(formattedItems);
    }

    setIsLoading(false);
  }, [marketContract]);

  useEffect(() => {
    GetMarketNft();
  }, [GetMarketNft]);

  return {
    data: nftMarketHistory,
    isLoading,
    refetch: GetMarketNft,
  };
};

export default useGetMarketNftHistory;
