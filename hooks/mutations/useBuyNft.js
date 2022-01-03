import { ethers } from "ethers";
import { CRYPTO_CURRENCY } from "../../utils/constants";
import { nftaddress } from "../../config";

import useEthers from "../contexts/useEthers";

/**
 * hook to buy nft
 * @returns {{buyNftMutation: function}}
 */
const useBuyNft = () => {
  const { signedMarketContract } = useEthers();

  /** function to buy nft
   * @param {object} nft to be bought
   * @returns {Promise< object {success: bool, ...res: transaction data} >} self-descriptive
   */
  const buyNftMutation = async (nft) => {
    const price = ethers.utils.parseUnits(
      nft.price.toString(),
      CRYPTO_CURRENCY
    );

    // TODO: Throw success/fail toasts
    const marketSale = await signedMarketContract
      .createMarketSale(nftaddress, nft.itemId, {
        value: price,
      })
      .then((res) => ({ success: true, ...res }))
      .catch((res) => {
        console.log("Purchaese failed");
        return { success: false, ...res };
      });

    return marketSale;
  };

  return { buyNftMutation };
};

export default useBuyNft;
