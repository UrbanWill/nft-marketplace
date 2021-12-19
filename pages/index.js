import { useWeb3React } from "@web3-react/core";
import NFTList from "../components/NFTList/NFTList";
import useGetMarketNfts from "../hooks/queries/useGetMarketNfts";

import useBuyNft from "../hooks/mutations/useBuyNft";

export default function Home() {
  const { data, isLoading, refetch } = useGetMarketNfts();
  const { active } = useWeb3React();

  const { handleBuyNftMutation } = useBuyNft();

  const handleAction = (nft) => {
    if (!active) {
      // TODO: Open "connect your wallet" modal
      // eslint-disable-next-line no-alert
      return window.alert("Connect your wallet to make a purchase");
    }
    return handleBuyNftMutation(nft).then(() => refetch());
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
