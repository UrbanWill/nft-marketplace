import { useState, useEffect, useCallback } from "react";
import { ethers } from "ethers";
import { CRYPTO_CURRENCY } from "../../utils/constants";

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
    if (!marketContract) {
      return;
    }

    const marketNftHistory = await marketContract.fetchMarketItemHistory(
      tokenId
    );

    if (marketNftHistory) {
      const formattedItems = await Promise.all(
        marketNftHistory.map(async (item) => {
          const price = ethers.utils.formatUnits(
            item.price.toString(),
            CRYPTO_CURRENCY
          );
          const formattedItem = {
            price,
            tokenId: item.tokenId.toNumber(),
            itemId: item.itemId.toNumber(),
            seller: item.seller,
            owner: item.owner,
            sold: item.sold,
          };
          return formattedItem;
        })
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
