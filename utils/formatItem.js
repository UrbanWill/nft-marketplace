/* eslint-disable no-underscore-dangle */
import { ethers } from "ethers";
import { CRYPTO_CURRENCY } from "./constants";

/**
 *  function to format NFT data
 * @param {Object} item data from marketplace contract
 * @param {number | null} item.price
 * @param {BigNumber | number} item.tokenId
 * @param {BigNumber | number} item.itemId
 * @param {string | null} item.seller
 * @param {string | null} item.owner
 * @param {bool} item.sold
 * @param {Object} meta metadata from TokenURI
 * @param {string} meta.image image url
 * @param {string} meta.name
 * @param {string} meta.description
 * @returns {Object} formatted nft data
 */

const formatItem = (item, meta) => ({
  price: item.price
    ? ethers.utils.formatUnits(item.price?.toString(), CRYPTO_CURRENCY)
    : null,
  tokenId: item.tokenId?._isBigNumber ? item.tokenId.toNumber() : item.tokenId,
  itemId: item.itemId?._isBigNumber
    ? item.itemId.toNumber()
    : item.itemId || null,
  seller: item.seller || null,
  owner: item.owner,
  sold: item.sold,
  image: meta?.data.image || null,
  name: meta?.data.name || null,
  description: meta?.data.description || null,
});

export default formatItem;
