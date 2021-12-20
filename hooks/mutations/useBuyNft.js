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
   * @returns {Promise<*>} self-descriptive
   */
  const buyNftMutation = async (nft) => {
    const price = ethers.utils.parseUnits(
      nft.price.toString(),
      CRYPTO_CURRENCY
    );

    // TODO: Throw success/fail toasts
    const marketSale = await signedMarketContract
      .createMarketSale(nftaddress, nft.tokenId, {
        value: price,
      })
      .then(() => {
        console.log("Purchase sucess!");
      })
      .catch(() => console.log("Purchaese failed"));

    return marketSale;
  };

  return { buyNftMutation };
};

export default useBuyNft;
