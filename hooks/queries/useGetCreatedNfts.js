import { useState, useEffect, useCallback } from "react";
import { ethers } from "ethers";
import { useWeb3React } from "@web3-react/core";
import { toast } from "react-toastify";

import axios from "axios";
import { CRYPTO_CURRENCY } from "../../utils/constants";

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
