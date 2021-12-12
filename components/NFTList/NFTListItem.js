import PropTypes from "prop-types";
import Image from "next/image";

import { nftPropType } from "../../utils/propTypes";

const propTypes = {
  nft: nftPropType.isRequired,
  onHandleAction: PropTypes.func,
};

const NFTListItem = ({ nft, onHandleAction }) => {
  const { name, image, description, price } = nft;

  const hasAction = !!onHandleAction;

  return (
    <li className="border shadow rounded-xl overflow-hidden flex flex-col justify-between h-128">
      <div className="h-4/5 relative">
        <Image
          src={image}
          alt="NFT image"
          layout="fill"
          objectFit="cover"
          objectPosition="top center"
        />
      </div>
      <div className="p-2">
        <p className="text-2xl font-semibold">{name}</p>
        <div>
          <p className="text-gray-400">{description}</p>
        </div>
      </div>
      <div className="p-4 bg-black">
        <p className="text-2xl font-bold text-white">{price} ETH</p>
        {hasAction && (
          <button
            className="w-full bg-pink-500 text-white font-bold py-2 px-12 rounded"
            onClick={() => onHandleAction(nft)}
          >
            Buy
          </button>
        )}
      </div>
    </li>
  );
};

NFTListItem.propTypes = propTypes;
export default NFTListItem;
