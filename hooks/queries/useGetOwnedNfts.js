import { useState, useEffect, useCallback } from "react";
import { useWeb3React } from "@web3-react/core";
import { toast } from "react-toastify";
import axios from "axios";
import formatItem from "../../utils/formatItem";

import useEthers from "../contexts/useEthers";

/**
 * hook to get nfts the connected wallet currently owns
 * @returns { data: [] | array of objects, isLoading: boolean }
 */
const useGetOwnedNfts = () => {
  const [nfts, setNfts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { active, account } = useWeb3React();
  const { tokenContract } = useEthers();

  const loadNFTs = useCallback(async () => {
    setIsLoading(true);

    if (!active || !tokenContract) {
      // Clears soldNfts when wallet is disconnected
      setNfts([]);
      setIsLoading(false);
      return;
    }

    const data = await tokenContract.getTokenIds(account).catch((error) => {
      toast.error(`${error}`);
      return null;
    });

    if (data) {
      const formattedItems = await Promise.all(
        data.map(async (item) => {
          const tokenUri = await tokenContract.tokenURI(item.toNumber());
          const meta = await axios.get(tokenUri);
          return formatItem({ tokenId: item }, meta);
        })
      );
      setNfts(formattedItems);
    }

    setIsLoading(false);
  }, [tokenContract, active, account]);

  useEffect(() => {
    loadNFTs();
  }, [loadNFTs]);

  return {
    data: nfts,
    isLoading,
    refetch: loadNFTs,
  };
};

export default useGetOwnedNfts;
