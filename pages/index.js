import { useWeb3React } from "@web3-react/core";
import NFTList from "../components/NFTList/NFTList";
import useGetMarketNfts from "../hooks/queries/useGetMarketNfts";
import useToggleWalletPanel from "../hooks/contexts/useToggleWalletPanel";
import { ACTION_TYPES } from "../utils/constants";

import useBuyNft from "../hooks/mutations/useBuyNft";
import useRemoveListedNft from "../hooks/mutations/useRemoveListedNft";

const { REMOVE_ITEM, BUY } = ACTION_TYPES;

export default function Home() {
  const { data, isLoading, refetch } = useGetMarketNfts();
  const { active } = useWeb3React();
  const { setIsWalletPanelOpen } = useToggleWalletPanel();

  const { buyNftMutation } = useBuyNft();
  const { removeListingNftMutation } = useRemoveListedNft();

  const handleAction = (nft, action) => {
    if (!active) {
      // Opens wallet panel for user to connect wallet before making a purchase
      return setIsWalletPanelOpen(true);
    }

    const actions = {
      [REMOVE_ITEM]: () => removeListingNftMutation(nft.itemId),
      [BUY]: () => buyNftMutation(nft),
    };

    return actions[action]().then((res) => {
      // Only refetches if user did not cancel the transaction or has insufficient funds
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
      <h1 className="py-5 text-2xl font-bold">Explore NFTs</h1>
      <NFTList
        nfts={data}
        onHandleAction={handleAction}
        isLoading={isLoading}
        emptyListMessage="No items in marketplace"
      />
    </>
  );
}
