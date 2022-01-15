import PropTypes from "prop-types";
import Image from "next/image";
import Button from "../shared/Button/Button";
import Spinner from "../shared/Spinner/Spinner";

import useGetNft from "../../hooks/queries/useGetNft";

const propTypes = {
  nftId: PropTypes.string.isRequired,
};

const NftItem = ({ nftId }) => {
  const { data, isLoading } = useGetNft(nftId);
  const { name, description, image } = data;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center flex-1">
        <Spinner size="10" />
      </div>
    );
  }

  return (
    <div className="flex justify-center pt-10">
      <div className="w-full md:w-5/6  xl:w-2/3 2xl:w-3/5 border-2 p-10 rounded-xl">
        <div className="flex flex-col lg:flex-row">
          <div className="h-96 sm:w-96 relative rounded-xl lg:mr-4">
            <Image
              src={image}
              alt="NFT image"
              layout="fill"
              objectFit="cover"
              objectPosition="top center"
              className="rounded-xl"
            />
          </div>
          <div className="flex-1 flex flex-col justify-between pt-5">
            <h1 className="text-2xl font-bold">{`${name} #${nftId}`}</h1>
            <p className="font-medium">{description}</p>
            <Button
              label="Create Digital Asset"
              // isDisabled={!isValid || !ipfsUrl || isMutationLoading}
              // isLoading={isIpfsLoading || isMutationLoading}
              className="mt-4 w-full"
              isTypeSubmit
              size="lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

NftItem.propTypes = propTypes;

export default NftItem;
