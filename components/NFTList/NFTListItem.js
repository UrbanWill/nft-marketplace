import PropTypes from "prop-types";
import Image from "next/image";

import { nftPropType } from "../../utils/propTypes";

import Button from "../shared/Button";

const propTypes = {
  nft: nftPropType.isRequired,
  onHandleAction: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
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
          <p className="text-gray-400 truncate">{description}</p>
        </div>
      </div>
      <div className="p-4 bg-black">
        <p className="text-2xl font-bold text-white">{price} ETH</p>
        {hasAction && (
          <Button
            onHandleClick={() => onHandleAction(nft)}
            label="Buy"
            className="w-full mt-2"
          />
        )}
      </div>
    </li>
  );
};

NFTListItem.defaultProps = {
  onHandleAction: false,
};

NFTListItem.propTypes = propTypes;
export default NFTListItem;
