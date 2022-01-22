import { useRouter } from "next/router";
import NftItem from "../../components/Nft/NftItem";
import Spinner from "../../components/shared/Spinner/Spinner";

const Nft = () => {
  const { query } = useRouter();

  return (
    <>
      {!query.nft ? (
        <div className="flex justify-center items-center flex-1">
          <Spinner size="10" />
        </div>
      ) : (
        <NftItem nftId={query.nft} />
      )}
    </>
  );
};

export default Nft;
