import { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";

import NFTList from "../components/NFTList/NFTList";

import useGetCreatedNfts from "../hooks/queries/useGetCreatedNfts";
import useRemoveListedNft from "../hooks/mutations/useRemoveListedNft";

const getConnectMessage = (message) => (
  <div className="flex flex-col justify-center items-center flex-1">
    <h1 className="py-10 text-2xl">{message}</h1>
  </div>
);

export default function CreatorDashboard() {
  const [soldNfts, setSoldNfts] = useState([]);
  const [listedNfts, setListedNfts] = useState([]);
  const [isSortNftsLoading, setIsSortNftsLoading] = useState(true);
  const [selectedNft, setSelectedNft] = useState({});

  const { active } = useWeb3React();
  const { data, isLoading, refetch } = useGetCreatedNfts();
  const { removeListingNftMutation, isLoading: isRemoveLoading } =
    useRemoveListedNft();

  useEffect(() => {
    // Clears sold and listed nfts when wallet is disconnected
    if (!active) {
      setSoldNfts([]);
      setListedNfts([]);
    }
    setIsSortNftsLoading(true);
    const sortedNfts = data.reduce(
      (acc, nftItem) => {
        if (nftItem.sold) {
          acc.sold.push(nftItem);
        } else {
          acc.listed.push(nftItem);
        }

        return acc;
      },
      { sold: [], listed: [] }
    );
    setSoldNfts(sortedNfts.sold);
    setListedNfts(sortedNfts.listed);

    setIsSortNftsLoading(false);
  }, [active, data]);

  const handleRemoveNft = (nft) => {
    setSelectedNft(nft);
    removeListingNftMutation(nft.itemId).then((res) => {
      setSelectedNft({});
      if (
        res.code === 4001 ||
        (res.code === -32603 && res.data.code === -32000)
      ) {
        return null;
      }
      return refetch();
    });
  };

  return (
    <>
      <h1 className="py-5 text-2xl font-bold">My listed items</h1>
      {!active ? (
        getConnectMessage("Connect wallet to view your listed assets")
      ) : (
        <NFTList
          nfts={listedNfts}
          selectedTokenId={selectedNft.tokenId}
          onHandleAction={handleRemoveNft}
          isActionLoading={isRemoveLoading}
          isLoading={isLoading || isSortNftsLoading}
          emptyListMessage="No items listed"
        />
      )}

      <h1 className="py-5 text-2xl font-bold">Items sold</h1>
      {!active ? (
        getConnectMessage("Connect wallet to view your sold assets")
      ) : (
        <NFTList
          nfts={soldNfts}
          isLoading={isLoading || isSortNftsLoading}
          emptyListMessage="No Items sold"
        />
      )}
    </>
  );
}
