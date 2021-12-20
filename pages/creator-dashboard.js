import { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";

import NFTList from "../components/NFTList/NFTList";

import useGetCreatedNfts from "../hooks/queries/useGetCreatedNfts";

const getConnectMessage = (message) => (
  <div className="flex justify-center">
    <h1 className="px-20 py-10 text-2xl">{message}</h1>
  </div>
);

export default function CreatorDashboard() {
  const [soldNfts, setSoldNfts] = useState([]);
  const [isSoldNftsLoading, setIsSoldNftsLoading] = useState(false);

  const { active } = useWeb3React();
  const { data, isLoading } = useGetCreatedNfts();

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

  return (
    <div>
      <h2 className="text-2xl py-2">Items Created</h2>
      {!active ? (
        getConnectMessage("Connect wallet to view your created assets")
      ) : (
        <NFTList
          nfts={data}
          // TODO: Add list/delist functionality
          // onHandleAction={handleDoSomeAction}
          isLoading={isLoading}
          emptyListMessage="No items created"
        />
      )}

      <h2 className="text-2xl py-2">Items sold</h2>
      {!active ? (
        getConnectMessage("Connect wallet to view your sold assets")
      ) : (
        <NFTList
          nfts={soldNfts}
          isLoading={isSoldNftsLoading}
          emptyListMessage="No Items sold"
        />
      )}
    </div>
  );
}
