import { ethers } from "ethers";
import Web3Modal from "web3modal";

import NFTList from "../components/NFTList/NFTList";

import useGetMarketNfts from "../hooks/queries/useGetMarketNfts";

import { nftaddress, nftmarketaddress } from "../config";

import { CRYPTO_CURRENCY } from "../utils/constants";

import Market from "../artifacts/contracts/NFTMarket.sol/NFTMarket.json";

const emptyListMessage = "No items in marketplace";

export default function Home() {
  const { data, isLoading, refetch } = useGetMarketNfts();

  const handleBuyNft = async (nft) => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);

    const signer = provider.getSigner();
    const contract = new ethers.Contract(nftmarketaddress, Market.abi, signer);

    const price = ethers.utils.parseUnits(
      nft.price.toString(),
      CRYPTO_CURRENCY
    );

    const transaction = await contract.createMarketSale(
      nftaddress,
      nft.tokenId,
      { value: price }
    );

    await transaction.wait();

    refetch();
  };

  return (
    <NFTList
      nfts={data}
      onHandleAction={handleBuyNft}
      isLoading={isLoading}
      emptyListMessage={emptyListMessage}
    />
  );
}
