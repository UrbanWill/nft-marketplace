import PropTypes from "prop-types";
import Image from "next/image";

import { nftPropType } from "../../utils/propTypes";

const propTypes = {
  nft: nftPropType.isRequired,
  onHandleAction: PropTypes.func.isRequired,
};

const NFTListItem = ({ nft, onHandleAction }) => {
  const { name, image, description, price } = nft;
  return (
    <div className="border shadow rounded-xl overflow-hidden">
      <Image src={image} alt="NFT image" width="200px" height="200px" />
      <div className="p-4">
        <p style={{ height: "64px" }} className="text-2xl font-semibold">
          {name}
        </p>
        <div>
          <p className="text-gray-400">{description}</p>
        </div>
      </div>
      <div className="p-4 bg-black">
        <p className="text-2xl mb-4 font-bold text-white">{price} ETH</p>
        <button
          className="w-full bg-pink-500 text-white font-bold py-2 px-12 rounded"
          onClick={() => onHandleAction(nft)}
        >
          Buy
        </button>
      </div>
    </div>
  );
};

NFTListItem.propTypes = propTypes;
export default NFTListItem;
