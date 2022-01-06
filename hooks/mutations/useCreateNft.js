import { useState } from "react";
import useEthers from "../contexts/useEthers";

/**
 * hook to create nft
 * @returns {{createNftMutation: function}, {isLoading: bool}}
 */
const useCreateNft = () => {
  const [isLoading, setisLoading] = useState(false);
  const { signedTokenContract } = useEthers();

  /** function to create nft
   * @param {url} nft url to be minted
   * @returns {Promise<{ object {transaction receipt data, tokenId: int}> }
   */
  const createNftMutation = async (url) => {
    setisLoading(true);
    // TODO: Throw success/fail toasts
    const transaction = await signedTokenContract
      .createToken(url)
      .then(async (res) => {
        const transactionReceipt = await res
          .wait()
          .then((receipt) => receipt)
          .catch((err) => console.log(err));
        const tokenId = transactionReceipt.events[0].args[2].toNumber();
        return { ...transactionReceipt, tokenId };
      })
      .catch((err) => {
        if (err.code === 4001) {
          console.log("User cancelled transaction");
        }
        return err;
      });
    setisLoading(false);
    return transaction;
  };

  return { createNftMutation, isLoading };
};

export default useCreateNft;
