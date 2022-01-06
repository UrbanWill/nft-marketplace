import { useState, useRef } from "react";
import { toast } from "react-toastify";
import useEthers from "../contexts/useEthers";
import toastUpdate from "../../utils/toastUpdate";

/**
 * hook to create nft
 * @returns {{createNftMutation: function}, {isLoading: bool}}
 */
const useCreateNft = () => {
  const [isLoading, setisLoading] = useState(false);
  const toastRef = useRef(null);
  const { signedTokenContract } = useEthers();

  /** function to create nft
   * @param {url} nft url to be minted
   * @returns {Promise<{ object {transaction receipt data, tokenId: int}> }
   */
  const createNftMutation = async (url) => {
    setisLoading(true);

    toastRef.current = toast("Waiting for transaction approval", {
      isLoading: true,
    });
    const transaction = await signedTokenContract
      .createToken(url)
      .then(async (res) => {
        toastUpdate(
          toastRef.current,
          toast.TYPE.DEFAULT,
          "Processing transaction",
          true
        );
        const transactionReceipt = await res
          .wait()
          .then((receipt) => {
            toastUpdate(
              toastRef.current,
              toast.TYPE.SUCCESS,
              "NFT minted successfully!"
            );
            return receipt;
          })
          .catch((err) => {
            toastUpdate(toastRef.current, toast.TYPE.ERROR, err.message);
            return err;
          });
        const tokenId = transactionReceipt.events[0].args[2].toNumber();
        return { ...transactionReceipt, tokenId };
      })
      .catch((err) => {
        toastUpdate(toastRef.current, toast.TYPE.ERROR, err.message);
        return err;
      });
    setisLoading(false);
    return transaction;
  };

  return { createNftMutation, isLoading };
};

export default useCreateNft;
