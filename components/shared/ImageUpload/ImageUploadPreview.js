import PropTypes from "prop-types";
import Image from "next/image";

const propTypes = {
  ipfsUrl: PropTypes.string.isRequired,
};

const ImageUploadPreview = ({ ipfsUrl }) => (
  <div className="h-full w-96 relative">
    <Image src={ipfsUrl} alt="NFT image" layout="fill" objectFit="cover" />
  </div>
);

ImageUploadPreview.propTypes = propTypes;
export default ImageUploadPreview;
