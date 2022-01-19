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
  const [isSoldNftsLoading, setIsSoldNftsLoading] = useState(false);

  const { active } = useWeb3React();
  const { data, isLoading, refetch } = useGetCreatedNfts();
  const { removeListingNftMutation } = useRemoveListedNft();

  useEffect(() => {
    // Clears soldNfts when wallet is disconnected
    if (!active) {
      setSoldNfts([]);
    }
    setIsSoldNftsLoading(true);
    // Filters for sold nfts
    const soldItems = data.filter((nft) => nft.sold);
    setSoldNfts(soldItems);
    setIsSoldNftsLoading(false);
  }, [active, data]);

  const handleRemoveNft = (nft) => {
    removeListingNftMutation(nft.itemId).then((res) => {
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
        getConnectMessage("Connect wallet to view your created assets")
      ) : (
        <NFTList
          nfts={data}
          onHandleAction={handleRemoveNft}
          isLoading={isLoading}
          emptyListMessage="No items created"
        />
      )}

      <h1 className="py-5 text-2xl font-bold">Items sold</h1>
      {!active ? (
        getConnectMessage("Connect wallet to view your sold assets")
      ) : (
        <NFTList
          nfts={soldNfts}
          isLoading={isSoldNftsLoading}
          emptyListMessage="No Items sold"
        />
      )}
    </>
  );
}
