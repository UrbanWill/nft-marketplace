import { useState, useRef } from "react";
import { ethers } from "ethers";
import { toast } from "react-toastify";
import { CRYPTO_CURRENCY } from "../../utils/constants";
import { nftaddress } from "../../config";
import toastUpdate from "../../utils/toastUpdate";

import useEthers from "../contexts/useEthers";

/**
 * hook to buy nft
 * @returns {{buyNftMutation: function}, {isLoading: bool}}
 */
const useBuyNft = () => {
  const [isLoading, setIsLoading] = useState(false);
  const toastRef = useRef(null);
  const { signedMarketContract } = useEthers();

  /** function to buy nft
   * @param {object} nft to be bought
   * @returns {Promise< object {transaction receipt data} >} self-descriptive
   */
  const buyNftMutation = async (nft) => {
    const price = ethers.utils.parseUnits(
      nft.price.toString(),
      CRYPTO_CURRENCY
    );
    setIsLoading(true);

    toastRef.current = toast("Waiting for transaction approval", {
      isLoading: true,
    });
    const transaction = await signedMarketContract
      .createMarketSale(nftaddress, nft.itemId, {
        value: price,
      })
      .then(async (res) => {
        toastUpdate(
          toastRef.current,
          toast.TYPE.DEFAULT,
          "Processing transaction",
          true
        );
        return res
          .wait()
          .then((transactionReceipt) => {
            toastUpdate(
              toastRef.current,
              toast.TYPE.SUCCESS,
              "Purchase successful!"
            );
            return transactionReceipt;
          })
          .catch((err) => {
            toastUpdate(toastRef.current, toast.TYPE.ERROR, err.message);
            return err;
          });
      })
      .catch((err) => {
        let errorMessage = err.message;
        if (err.data.code === -32000) {
          errorMessage = "Insufficient funds";
        }
        toastUpdate(toastRef.current, toast.TYPE.ERROR, errorMessage);
        return err;
      });

    setIsLoading(false);
    return transaction;
  };

  return { buyNftMutation, isLoading };
};

export default useBuyNft;
