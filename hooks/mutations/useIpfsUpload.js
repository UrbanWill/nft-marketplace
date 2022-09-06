import { useState } from "react";
import { toast } from "react-toastify";
import { Buffer } from "buffer";
import { create } from "ipfs-http-client";

// constants
import { IPFS_PROJECT_ID, INFURA_URL } from "../../utils/constants";

/**
 * function to return hook, data and loading state
 * @param {ipfsApiKey} string secret ipfs key
 * @returns {ipfsUploadMutation: fn, isLoading: bool, data: ipfs data response} ipfs data
 */

const useIpfsUpload = (ipfsApiKey) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  const auth = `Basic ${Buffer.from(
    `${IPFS_PROJECT_ID}:${ipfsApiKey}`
  ).toString("base64")}`;

  const client = create({
    host: INFURA_URL,
    port: 5001,
    protocol: "https",
    headers: {
      authorization: auth,
    },
  });

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
