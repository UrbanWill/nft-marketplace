import PropTypes from "prop-types";

import NFTListItem from "./NFTListItem";

import { nftPropType } from "../../utils/propTypes";

const propTypes = {
  nfts: PropTypes.arrayOf(nftPropType).isRequired,
  onHandleAction: PropTypes.func,
  isLoading: PropTypes.bool.isRequired,
  emptyListMessage: PropTypes.string.isRequired,
};

const NFTList = ({ nfts, onHandleAction, isLoading, emptyListMessage }) => {
  // TODO: add loading animation
  if (isLoading) {
    return (
      <div className="flex justify-center">
        <h1 className="px-20 py-10 text-3xl">Loading</h1>
      </div>
    );
  }

  if (!isLoading && !nfts.length) {
    return (
      <div className="flex justify-center">
        <h1 className="px-20 py-10 text-3xl">{emptyListMessage}</h1>
      </div>
    );
  }

  return (
    <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 lg:gap-4 pt-4">
      {nfts.map((nft) => (
        <NFTListItem
          nft={nft}
          key={nft.tokenId}
          onHandleAction={onHandleAction}
        />
      ))}
    </ul>
  );
};

NFTList.propTypes = propTypes;
export default NFTList;
