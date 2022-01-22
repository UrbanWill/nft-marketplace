import { useWeb3React } from "@web3-react/core";
import NFTList from "../components/NFTList/NFTList";

import useGetOwnedNfts from "../hooks/queries/useGetOwnedNfts";

export default function MyAssets() {
  const { active } = useWeb3React();
  const { data, isLoading } = useGetOwnedNfts();

  if (!active) {
    return (
      <div className="flex flex-col justify-center items-center flex-1">
        <h1 className="py-10 text-2xl">Connect wallet to view your assets</h1>
      </div>
    );
  }

  return (
    <>
      <h1 className="py-5 text-2xl font-bold">My assets</h1>
      <NFTList
        nfts={data}
        isLoading={isLoading}
        emptyListMessage="No assets owned"
      />
    </>
  );
}
