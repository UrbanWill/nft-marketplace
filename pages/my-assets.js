import { useWeb3React } from "@web3-react/core";
import { ACTION_TYPES } from "../utils/constants";
import NFTList from "../components/NFTList/NFTList";

import useGetOwnedNfts from "../hooks/queries/useGetOwnedNfts";
import useListNft from "../hooks/mutations/useListNft";

export default function MyAssets() {
  const { active } = useWeb3React();
  const { data, isLoading, refetch } = useGetOwnedNfts();

  const { listNftMutation } = useListNft();

  // TODO: create a modal to input the price.
  const handleAction = (nft) => {
    console.log(nft);
    listNftMutation(nft.tokenId, "99").then((res) => {
      if (res.code !== 4001) {
        refetch();
      }
    });
  };

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
        onHandleAction={handleAction}
        actionType={ACTION_TYPES.LIST_ITEM}
        isLoading={isLoading}
        emptyListMessage="No assets owned"
      />
    </>
  );
}
