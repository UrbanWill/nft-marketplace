import PropTypes from "prop-types";
import Image from "next/image";

import gabageIcon from "../../../assets/images/garbage-icon-black.png";

const propTypes = {
  ipfsUrl: PropTypes.string.isRequired,
  handleRemoveImage: PropTypes.func.isRequired,
};

const ImageUploadPreview = ({ ipfsUrl, handleRemoveImage }) => {
  const handleClick = (e) => {
    e.stopPropagation();
    handleRemoveImage();
  };

  return (
    <div className="h-full w-96 border shadow rounded-xl relative">
      <button
        type="button"
        onClick={handleClick}
        className="z-10 absolute right-2 top-2"
      >
        <Image src={gabageIcon} alt="remove icon" onClick={handleClick} />
      </button>
      <Image src={ipfsUrl} alt="NFT image" layout="fill" objectFit="cover" />
    </div>
  );
};

ImageUploadPreview.propTypes = propTypes;
export default ImageUploadPreview;
