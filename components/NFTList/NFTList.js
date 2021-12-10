import PropTypes from "prop-types";

const propTypes = {
  nfts: PropTypes.arrayOf(
    PropTypes.shape({
      description: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.string.isRequired,
      tokenId: PropTypes.number.isRequired,
    })
  ).isRequired,
  onHandleAction: PropTypes.func.isRequired,
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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
      {nfts.map((nft, i) => (
        <div key={i} className="border shadow rounded-xl overflow-hidden">
          <img src={nft.image} />
          <div className="p-4">
            <p style={{ height: "64px" }} className="text-2xl font-semibold">
              {nft.name}
            </p>
            <div style={{ height: "70px", overflow: "hidden" }}>
              <p className="text-gray-400">{nft.description}</p>
            </div>
          </div>
          <div className="p-4 bg-black">
            <p className="text-2xl mb-4 font-bold text-white">
              {nft.price} ETH
            </p>
            <button
              className="w-full bg-pink-500 text-white font-bold py-2 px-12 rounded"
              onClick={() => onHandleAction(nft)}
            >
              Buy
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

NFTList.propTypes = propTypes;
export default NFTList;
