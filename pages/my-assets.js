import { ethers } from "ethers";
import { useEffect, useState } from "react";
import axios from "axios";
import Web3Modal from "web3modal";

import NFTList from "../components/NFTList/NFTList";

import { nftmarketaddress, nftaddress } from "../config";

import NFT from "../artifacts/contracts/NFT.sol/NFT.json";
import Market from "../artifacts/contracts/NFTMarket.sol/NFTMarket.json";

const emptyListMessage = "No assets owned";

export default function MyAssets() {
  const [nfts, setNfts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadNFTs = async () => {
    setIsLoading(true);

    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    const marketContract = new ethers.Contract(
      nftmarketaddress,
      Market.abi,
      signer
    );
    const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider);
    const data = await marketContract.fetchMyNFTs();

    const items = await Promise.all(
      data.map(async (i) => {
        const tokenUri = await tokenContract.tokenURI(i.tokenId);
        const meta = await axios.get(tokenUri);
        const price = ethers.utils.formatUnits(i.price.toString(), "ether");
        const item = {
          price,
          tokenId: i.tokenId.toNumber(),
          seller: i.seller,
          owner: i.owner,
          image: meta.data.image,
          name: meta.data.name,
          description: meta.data.description,
        };
        return item;
      })
    );
    setNfts(items);
    setIsLoading(false);
  };

  useEffect(() => {
    loadNFTs();
  }, []);

  return (
    <NFTList
      nfts={nfts}
      // TODO: Add sell functionality
      // onHandleAction={handleDoSomeAction}
      isLoading={isLoading}
      emptyListMessage={emptyListMessage}
    />
  );
}
