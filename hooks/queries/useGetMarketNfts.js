import { useState, useEffect, useCallback } from "react";
import { ethers } from "ethers";
import { toast } from "react-toastify";

import axios from "axios";
import { CRYPTO_CURRENCY } from "../../utils/constants";

import useEthers from "../contexts/useEthers";

/**
 * hook to get nfts for sale
 * @returns { nfts: [] | array of objects, isLoading: boolen }
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
            image: meta.data.image,
            name: meta.data.name,
            description: meta.data.description,
          };
          return formattedItem;
        })
      );
      setNfts(formattedItems);
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
