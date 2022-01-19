/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
// TODO: Consider accessibility
import PropTypes from "prop-types";
import Image from "next/image";
import { useWeb3React } from "@web3-react/core";
import { useRouter } from "next/router";

import { nftPropType } from "../../utils/propTypes";
import { ACTION_TYPES } from "../../utils/constants";

import Button from "../shared/Button/Button";

const { LIST_ITEM, REMOVE_ITEM, BUY } = ACTION_TYPES;

const actions = {
  [LIST_ITEM]: { label: "List item", action: LIST_ITEM },
  [REMOVE_ITEM]: { label: "Remove item", action: REMOVE_ITEM },
  [BUY]: { label: "Buy", action: BUY },
};

const propTypes = {
  nft: nftPropType.isRequired,
  onHandleAction: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
};

const NFTListItem = ({ nft, onHandleAction }) => {
  const { account } = useWeb3React();
  const router = useRouter();

  const { name, image, description, price, seller, tokenId } = nft;

  const hasAction = !!onHandleAction;

  const getAction = () => {
    if (!seller) {
      return actions[LIST_ITEM];
    }
    if (seller === account) {
      return actions[REMOVE_ITEM];
    }
    return actions[BUY];
  };

  const handleClick = () => {
    router.push({ pathname: "/nft/[nft]", query: { nft: tokenId } });
  };

  const handleAction = (event) => {
    event.stopPropagation();
    onHandleAction(nft, getAction().action);
  };

  return (
    <li
      className="border shadow rounded-xl overflow-hidden flex flex-col justify-between h-128 cursor-pointer"
      onClick={handleClick}
    >
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
            onHandleClick={handleAction}
            label={getAction().label}
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
