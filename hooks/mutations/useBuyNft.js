import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import { CRYPTO_CURRENCY } from "../../utils/constants";
import { nftaddress, nftmarketaddress } from "../../config";
import Market from "../../artifacts/contracts/NFTMarket.sol/NFTMarket.json";

/**
 * hook to buy nft
 * @returns {{handleBuyNftMutation: function}}
 */
const useBuyNft = () => {
  const { account, library } = useWeb3React();

  /** function to buy nft
   * @param {object} nft to be bought
   * @returns {Promise<*>} self-descriptive
   */
  const handleBuyNftMutation = async (nft) => {
    if (!library && !account) {
      return console.log("Log in first to make a purchase");
    }

    const signer = library.getSigner(account);
    const contract = new ethers.Contract(nftmarketaddress, Market.abi, signer);

    const price = ethers.utils.parseUnits(
      nft.price.toString(),
      CRYPTO_CURRENCY
    );

    // TODO: Throw success/fail toasts
    const marketSale = await contract
      .createMarketSale(nftaddress, nft.tokenId, {
        value: price,
      })
      .then(() => {
        console.log("Purchase sucess!");
      })
      .catch(() => console.log("Purchaese failed"));

    return marketSale;
  };

  return { handleBuyNftMutation };
};

export default useBuyNft;
