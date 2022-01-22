import PropTypes from "prop-types";
import Image from "next/image";
import { XIcon } from "@heroicons/react/outline";
import Spinner from "../Spinner/Spinner";
import classNames from "../../../utils/classNames";

const propTypes = {
  imgPreviewUrl: PropTypes.string.isRequired,
  handleRemoveImage: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

const ImageUploadPreview = ({
  imgPreviewUrl,
  handleRemoveImage,
  isLoading,
}) => {
  const handleClick = (e) => {
    if (!isLoading) {
      e.stopPropagation();
      handleRemoveImage();
    }
  };

  return (
    <div className="h-full min-w-full sm:w-96 lg:w-96 shadow relative border-2 rounded-lg">
      {isLoading && (
        <div className="absolute z-20 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Spinner size="10" />
        </div>
      )}
      <button
        type="button"
        onClick={handleClick}
        className={classNames(
          isLoading && "cursor-not-allowed",
          "z-10 absolute right-2 top-2"
        )}
      >
        <XIcon
          className="block h-6 w-6"
          aria-hidden="true"
          onClick={handleClick}
        />
      </button>
      <Image
        unoptimized
        src={imgPreviewUrl}
        alt="NFT image"
        layout="fill"
        objectFit="cover"
        className={classNames(
          "rounded-lg",
          isLoading && "bg-gray-400 opacity-50"
        )}
      />
    </div>
  );
};

ImageUploadPreview.propTypes = propTypes;
export default ImageUploadPreview;
