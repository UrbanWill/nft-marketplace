import PropTypes from "prop-types";
import Image from "next/image";

import { nftPropType } from "../../utils/propTypes";
import { ACTION_TYPES } from "../../utils/constants";

import Button from "../shared/Button/Button";

const { LIST_ITEM, REMOVE_ITEM, BUY } = ACTION_TYPES;

const actionLabel = {
  [LIST_ITEM]: "List item",
  [REMOVE_ITEM]: "Delist item",
  [BUY]: "Buy",
};

const propTypes = {
  nft: nftPropType.isRequired,
  onHandleAction: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  actionType: PropTypes.oneOf(Object.values(ACTION_TYPES)),
};

const NFTListItem = ({ nft, onHandleAction, actionType }) => {
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
      {/* TODO: only show this footer of items that are for sale */}
      <div className="p-4 bg-black">
        <p className="text-2xl font-bold text-white">{price} ETH</p>
        {hasAction && (
          <Button
            onHandleClick={() => onHandleAction(nft)}
            label={actionLabel[actionType]}
            className="w-full mt-2"
          />
        )}
      </div>
    </li>
  );
};

NFTListItem.defaultProps = {
  onHandleAction: false,
  actionType: "",
};

NFTListItem.propTypes = propTypes;
export default NFTListItem;
