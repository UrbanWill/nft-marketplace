import NFTList from "../components/NFTList/NFTList";
import useGetMarketNfts from "../hooks/queries/useGetMarketNfts";

import useBuyNft from "../hooks/mutations/useBuyNft";

const emptyListMessage = "No items in marketplace";

export default function Home() {
  const { data, isLoading, refetch } = useGetMarketNfts();

  const { handleBuyNftMutation } = useBuyNft();

  const handleAction = (nft) => {
    handleBuyNftMutation(nft).then(() => refetch());
  };

  return (
    <NFTList
      nfts={data}
      onHandleAction={handleAction}
      isLoading={isLoading}
      emptyListMessage={emptyListMessage}
    />
  );
}
