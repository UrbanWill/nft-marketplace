import PropTypes from "prop-types";

import NFTListItem from "./NFTListItem";

import { nftPropType } from "../../utils/propTypes";

const propTypes = {
  nfts: PropTypes.arrayOf(nftPropType).isRequired,
  onHandleAction: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  isLoading: PropTypes.bool.isRequired,
  emptyListMessage: PropTypes.string.isRequired,
};

const NFTList = ({ nfts, onHandleAction, isLoading, emptyListMessage }) => {
  // TODO: add loading animation
  if (isLoading) {
    return (
      <div className="flex justify-center">
        <h1 className="px-20 py-10 text-2xl">Loading</h1>
      </div>
    );
  }

  if (!isLoading && !nfts.length) {
    return (
      <div className="flex justify-center">
        <h1 className="px-20 py-10 text-2xl">{emptyListMessage}</h1>
      </div>
    );
  }

  return (
    <ul className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4 xl:grid-cols-4 2xl:grid-cols-5 pt-4">
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

NFTList.defaultProps = {
  onHandleAction: false,
};

NFTList.propTypes = propTypes;
export default NFTList;
