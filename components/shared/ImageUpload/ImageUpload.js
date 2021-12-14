import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

import PropTypes from "prop-types";

const propTypes = {
  onSetUploadedImage: PropTypes.func.isRequired,
};

const ImageUpload = ({ onSetUploadedImage }) => {
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
        onSetUploadedImage(parsedFiles);
      }
    },
    [onSetUploadedImage]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
  });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag and drop some files here, or click to select files</p>
      )}
    </div>
  );
};

ImageUpload.propTypes = propTypes;
export default ImageUpload;
