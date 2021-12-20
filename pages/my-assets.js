import { useWeb3React } from "@web3-react/core";
import NFTList from "../components/NFTList/NFTList";

import useGetOwnedNfts from "../hooks/queries/useGetOwnedNfts";

export default function MyAssets() {
  const { active } = useWeb3React();
  const { data, isLoading } = useGetOwnedNfts();

  if (!active) {
    return (
      <div className="flex justify-center">
        <h1 className="px-20 py-10 text-2xl">
          Connect wallet to view your assets
        </h1>
      </div>
    );
  }

  return (
    <NFTList
      nfts={data}
      // TODO: Add sell functionality
      // onHandleAction={handleDoSomeAction}
      isLoading={isLoading}
      emptyListMessage="No assets owned"
    />
  );
}
