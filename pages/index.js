import { useWeb3React } from "@web3-react/core";
import NFTList from "../components/NFTList/NFTList";
import useGetMarketNfts from "../hooks/queries/useGetMarketNfts";
import useToggleWalletPanel from "../hooks/contexts/useToggleWalletPanel";

import useBuyNft from "../hooks/mutations/useBuyNft";

export default function Home() {
  const { data, isLoading, refetch } = useGetMarketNfts();
  const { active } = useWeb3React();
  const { setIsWalletPanelOpen } = useToggleWalletPanel();

  const { buyNftMutation } = useBuyNft();

  const handleAction = (nft) => {
    if (!active) {
      // Opens wallet panel for user to connect wallet before making a purchase
      return setIsWalletPanelOpen(true);
    }
    return buyNftMutation(nft).then((res) => {
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
    <NFTList
      nfts={data}
      onHandleAction={handleAction}
      isLoading={isLoading}
      emptyListMessage="No items in marketplace"
    />
  );
}
