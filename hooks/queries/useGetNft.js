import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import formatItem from "../../utils/formatItem";

import useEthers from "../contexts/useEthers";

/**
 * hook to get nft from tokenContract
 * @returns { nft: {} , isLoading: boolean }
 */

const useGetNft = (tokenId) => {
  const [nft, setNft] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const { tokenContract } = useEthers();

  const getNft = useCallback(async () => {
    if (!tokenContract || !tokenId) {
      return;
    }

    const totalSupply = await tokenContract.totalSupply();

    if (tokenId > totalSupply) {
      setError(true);
      setIsLoading(false);
      return;
    }

    const owner = await tokenContract.ownerOf(tokenId);

    const tokenUri = await tokenContract.tokenURI(tokenId);
    const meta = await axios.get(tokenUri);

    setNft(formatItem({ tokenId, owner }, meta));

    setIsLoading(false);
  }, [tokenContract, tokenId]);

  useEffect(() => {
    getNft();
  }, [getNft]);

  return {
    data: nft,
    isLoading,
    refetch: getNft,
    error,
  };
};

export default useGetNft;
