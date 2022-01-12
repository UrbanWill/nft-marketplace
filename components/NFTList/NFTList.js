import PropTypes from "prop-types";
import Spinner from "../shared/Spinner/Spinner";
import { ACTION_TYPES } from "../../utils/constants";

import NFTListItem from "./NFTListItem";

import { nftPropType } from "../../utils/propTypes";

const propTypes = {
  nfts: PropTypes.arrayOf(nftPropType).isRequired,
  onHandleAction: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  isLoading: PropTypes.bool.isRequired,
  emptyListMessage: PropTypes.string.isRequired,
  actionType: PropTypes.oneOf(Object.values(ACTION_TYPES)),
};

const getContent = (content) => (
  <div className="flex justify-center items-center flex-1">{content}</div>
);

const NFTList = ({
  nfts,
  onHandleAction,
  isLoading,
  emptyListMessage,
  actionType,
}) => {
  if (isLoading) {
    return getContent(<Spinner size="10" />);
  }

  if (!isLoading && !nfts.length) {
    return getContent(<h1 className="text-2xl">{emptyListMessage}</h1>);
  }

  return (
    <ul className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4 xl:grid-cols-4 2xl:grid-cols-5 pt-5">
      {nfts.map((nft) => (
        <NFTListItem
          nft={nft}
          key={nft.tokenId}
          onHandleAction={onHandleAction}
          actionType={actionType}
        />
      ))}
    </ul>
  );
};

NFTList.defaultProps = {
  onHandleAction: false,
  actionType: "",
};

NFTList.propTypes = propTypes;
export default NFTList;
