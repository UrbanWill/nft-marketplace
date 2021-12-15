import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

import PropTypes from "prop-types";

import ImageUploadPreview from "./ImageUploadPreview";

const propTypes = {
  onSetUploadedImages: PropTypes.func.isRequired,
  ipfsUrl: PropTypes.string.isRequired,
};

const ImageUpload = ({ onSetUploadedImages, ipfsUrl }) => {
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
  });

  const getDropMessage = isDragActive ? (
    <p>Drop the files here ...</p>
  ) : (
    <p>Drag and drop some files here, or click to select files</p>
  );

  return (
    <div
      {...getRootProps()}
      className={`border-dashed border-2 h-96 flex justify-center items-center overflow-hidden ${
        !ipfsUrl ? "cursor-pointer" : ""
      }`}
    >
      <input {...getInputProps()} />
      {ipfsUrl ? <ImageUploadPreview ipfsUrl={ipfsUrl} /> : getDropMessage}
    </div>
  );
};

ImageUpload.propTypes = propTypes;
export default ImageUpload;
