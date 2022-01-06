import { useState } from "react";
import { ethers } from "ethers";
import { CRYPTO_CURRENCY } from "../../utils/constants";
import { nftaddress } from "../../config";

import useEthers from "../contexts/useEthers";

/**
 * hook to list nft for sale
 * @returns {{ListNftMutation: function}, {isLoading: bool}}
 */
const useListNft = () => {
  const [isLoading, setIsloading] = useState(false);
  const { signedMarketContract } = useEthers();

  /** function to list nft
   * @param {tokenId} tokenId id to be listed
   * @param {price} price to be listed for
   * @returns {Promise< object {transaction receipt data} >} self-descriptive
   */
  const listNftMutation = async (tokenId, price) => {
    const salePrice = ethers.utils.parseUnits(price, CRYPTO_CURRENCY);

    setIsloading(true);

    const listingPrice = await signedMarketContract
      .getListingPrice()
      .then((res) => res.toString());

    // TODO: Throw success/fail toasts
    const transaction = await signedMarketContract
      .createMarketItem(nftaddress, tokenId, salePrice, {
        value: listingPrice,
      })
      .then(async (res) =>
        res
          .wait()
          .then((transactionReceipt) => {
            console.log("Listed sucessfully!");
            return transactionReceipt;
          })
          .catch((err) => err)
      )
      .catch((err) => {
        if (err.code === 4001) {
          console.log("user cancelled the transaction");
        }
        console.log("Listing failed!");
        return err;
      });

    setIsloading(false);

    return transaction;
  };

  return { listNftMutation, isLoading };
};

export default useListNft;
