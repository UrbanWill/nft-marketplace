import { useState } from "react";
import { ethers } from "ethers";
import { CRYPTO_CURRENCY } from "../../utils/constants";
import { nftaddress } from "../../config";

import useEthers from "../contexts/useEthers";

/**
 * hook to buy nft
 * @returns {{buyNftMutation: function}, {isLoading: bool}}
 */
const useBuyNft = () => {
  const [isLoading, setIsLoading] = useState(false);
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
    // TODO: Throw success/fail toasts
    const transaction = await signedMarketContract
      .createMarketSale(nftaddress, nft.itemId, {
        value: price,
      })
      .then(async (res) =>
        res
          .wait()
          .then((transactionReceipt) => {
            console.log("Purchase successful!");
            return transactionReceipt;
          })
          .catch((err) => err)
      )
      .catch((err) => {
        if (err.code === 4001) {
          console.log("user cancelled the transaction");
        }
        console.log("Purchase failed!");
        return err;
      });

    setIsLoading(false);
    return transaction;
  };

  return { buyNftMutation, isLoading };
};

export default useBuyNft;
