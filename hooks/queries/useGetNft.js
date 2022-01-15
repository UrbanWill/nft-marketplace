import { useState, useEffect, useCallback } from "react";

import axios from "axios";

import useEthers from "../contexts/useEthers";

/**
 * hook to get nft from tokenContract
 * @returns { nft: {} , isLoading: boolen }
 */

const useGetNft = (tokenId) => {
  const [nft, setNft] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const { tokenContract } = useEthers();

  const getNft = useCallback(async () => {
    if (!tokenContract) {
      return;
    }

    const tokenUri = await tokenContract.tokenURI(tokenId);
    const meta = await axios.get(tokenUri);
    const formattedItem = {
      tokenId,
      image: meta.data.image,
      name: meta.data.name,
      description: meta.data.description,
    };
    setNft(formattedItem);

    setIsLoading(false);
  }, [tokenContract, tokenId]);

  useEffect(() => {
    getNft();
  }, [getNft]);

  return {
    data: nft,
    isLoading,
    refetch: getNft,
  };
};

export default useGetNft;
