import { useState } from "react";
import { toast } from "react-toastify";
import { create } from "ipfs-http-client";

const client = create("https://ipfs.infura.io:5001/api/v0");

const useIpfsUpload = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  /**
   * function to upload data to ipfs
   * @param {File | object} info or file data to be uploaded to ipfs
   * @returns {Promise < Object >} ipfs data
   */
  const ipfsUploadMutation = async (info) => {
    setIsLoading(true);
    return client
      .add(info)
      .then((response) => {
        setIsLoading(false);
        setData(response);
        return response;
      })
      .catch((error) => {
        toast.error(`Failed to upload file to IPFS ${error}`);
      });
  };

  return { ipfsUploadMutation, data, isLoading };
};

export default useIpfsUpload;
