import { useState, useRef } from "react";
import { ethers } from "ethers";
import { toast } from "react-toastify";
import { useWeb3React } from "@web3-react/core";
import { CRYPTO_CURRENCY } from "../../utils/constants";
import { nftaddress, nftmarketaddress } from "../../config";
import toastUpdate from "../../utils/toastUpdate";

import useEthers from "../contexts/useEthers";

/**
 * hook to list nft for sale
 * @returns {{ListNftMutation: function}, {isLoading: bool}}
 */
const useListNft = () => {
  const [isLoading, setIsLoading] = useState(false);
  const toastRef = useRef(null);

  const { signedMarketContract, signedTokenContract } = useEthers();
  const { account } = useWeb3React();

  /** function to list nft
   * @param {tokenId} tokenId id to be listed
   * @param {price} price to be listed for
   * @returns {Promise< object {transaction receipt data} >} self-descriptive
   */
  const listNftMutation = async (tokenId, price) => {
    const salePrice = ethers.utils.parseUnits(price, CRYPTO_CURRENCY);

    setIsLoading(true);

    /** Checks if nftMarket is approved to transact the token */
    const isMarketApproved = await signedTokenContract.isApprovedForAll(
      account,
      nftmarketaddress
    );

    /** Function to request market approval to transact the token
     * @returns {Promise {bool}} perssion
     */
    const handleRequestApproval = async () => {
      const approvalRequest = await signedTokenContract
        .approve(nftmarketaddress, tokenId)
        .then((transactionReceipt) => {
          toastUpdate(
            toastRef.current,
            toast.TYPE.SUCCESS,
            "Market approval granted!"
          );
          return transactionReceipt;
        })
        .catch((err) => {
          toastUpdate(toastRef.current, toast.TYPE.ERROR, err.message);
          return err;
        });
      return approvalRequest;
    };

    if (!isMarketApproved) {
      await handleRequestApproval();
    }

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
              "Listing successful!"
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

    setIsLoading(false);

    return transaction;
  };

  return { listNftMutation, isLoading };
};

export default useListNft;
