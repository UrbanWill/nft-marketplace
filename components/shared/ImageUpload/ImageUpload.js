import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

import PropTypes from "prop-types";

import ImageUploadPreview from "./ImageUploadPreview";

const propTypes = {
  onSetUploadedImages: PropTypes.func.isRequired,
  imgPreviewUrl: PropTypes.string.isRequired,
  handleRemoveImage: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool,
  className: PropTypes.string,
  isLoading: PropTypes.bool.isRequired,
};

const ImageUpload = ({
  onSetUploadedImages,
  imgPreviewUrl,
  handleRemoveImage,
  isDisabled,
  className,
  isLoading,
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
        const parsedFilesWithPreview = parsedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
        onSetUploadedImages(parsedFilesWithPreview);
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
    <p>Drop image here...</p>
  ) : (
    <p>Drag and drop image here, or click to select</p>
  );

  return (
    <div
      {...getRootProps()}
      className={`h-96 sm:w-96 flex justify-center items-center overflow-hidden ${className} ${
        !imgPreviewUrl ? "cursor-pointer rounded-lg border-dashed border-2" : ""
      }`}
    >
      <input {...getInputProps()} />
      {imgPreviewUrl ? (
        <ImageUploadPreview
          imgPreviewUrl={imgPreviewUrl}
          handleRemoveImage={handleRemoveImage}
          isLoading={isLoading}
        />
      ) : (
        <div className="px-2">{getDropMessage}</div>
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
