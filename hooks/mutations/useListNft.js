import { ethers } from "ethers";
import { CRYPTO_CURRENCY } from "../../utils/constants";
import { nftaddress } from "../../config";

import useEthers from "../contexts/useEthers";

/**
 * hook to list nft for sale
 * @returns {{ListNftMutation: function}}
 */
const useListNft = () => {
  const { signedMarketContract } = useEthers();

  /** function to list nft
   * @param {tokenId} tokenId id to be listed
   * @param {price} price to be listed for
   * @returns {Promise< object {success: boolean} >} self-descriptive
   */
  const listNftMutation = async (tokenId, price) => {
    const salePrice = ethers.utils.parseUnits(price, CRYPTO_CURRENCY);

    const listingPrice = await signedMarketContract
      .getListingPrice()
      .then((res) => res.toString());

    // TODO: Throw success/fail toasts
    const marketList = await signedMarketContract
      .createMarketItem(nftaddress, tokenId, salePrice, {
        value: listingPrice,
      })
      .then(() => {
        console.log("Listed sucessfully!");
        return { success: true };
      })
      .catch(() => {
        console.log("Listing failed");
        return { success: false };
      });

    return marketList;
  };

  return { listNftMutation };
};

export default useListNft;
