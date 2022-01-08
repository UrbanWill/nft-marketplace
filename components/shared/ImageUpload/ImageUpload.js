import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

import PropTypes from "prop-types";

import ImageUploadPreview from "./ImageUploadPreview";

const propTypes = {
  onSetUploadedImages: PropTypes.func.isRequired,
  ipfsUrl: PropTypes.string.isRequired,
  handleRemoveImage: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool,
  className: PropTypes.string,
};

const ImageUpload = ({
  onSetUploadedImages,
  ipfsUrl,
  handleRemoveImage,
  isDisabled,
  className,
}) => {
  /**
   * Handle on drop file for react-dropzone
   * Creates new file instance without path
   * @param {Object[]} acceptedFiles that passed dropzone file restrictions, ie. File size, format etc.
   */
  const onDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles.length) {
        const parsedFiles = acceptedFiles.map(
          (file) => new File([file], file.name)
        );
        onSetUploadedImages(parsedFiles);
      }
    },
    [onSetUploadedImages]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: "image/jpeg, image/png",
    disabled: isDisabled,
  });

  const getDropMessage = isDragActive ? (
    <p>Drop the files here ...</p>
  ) : (
    <p>Drag and drop some files here, or click to select files</p>
  );

  return (
    <div
      {...getRootProps()}
      className={`h-96 flex justify-center items-center overflow-hidden ${className} ${
        !ipfsUrl ? "cursor-pointer border-dashed border-2" : ""
      }`}
    >
      <input {...getInputProps()} />
      {ipfsUrl ? (
        <ImageUploadPreview
          ipfsUrl={ipfsUrl}
          handleRemoveImage={handleRemoveImage}
        />
      ) : (
        getDropMessage
      )}
    </div>
  );
};

ImageUpload.defaultProps = {
  isDisabled: false,
  className: "",
};

ImageUpload.propTypes = propTypes;
export default ImageUpload;
