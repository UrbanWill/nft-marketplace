import { useState, useRef } from "react";
import { ethers } from "ethers";
import { toast } from "react-toastify";
import { CRYPTO_CURRENCY } from "../../utils/constants";
import { nftaddress } from "../../config";
import toastUpdate from "../../utils/toastUpdate";

import useEthers from "../contexts/useEthers";

/**
 * hook to list nft for sale
 * @returns {{ListNftMutation: function}, {isLoading: bool}}
 */
const useListNft = () => {
  const [isLoading, setIsloading] = useState(false);
  const toastRef = useRef(null);
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

    toastRef.current = toast("Waiting for transaction approval", {
      isLoading: true,
    });
    const transaction = await signedMarketContract
      .createMarketItem(nftaddress, tokenId, salePrice, {
        value: listingPrice,
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
        toastUpdate(toastRef.current, toast.TYPE.ERROR, err.message);
        return err;
      });

    setIsloading(false);

    return transaction;
  };

  return { listNftMutation, isLoading };
};

export default useListNft;
