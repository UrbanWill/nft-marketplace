import PropTypes from "prop-types";

const nftPropType = PropTypes.shape({
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  tokenId: PropTypes.number.isRequired,
});

export { nftPropType };
