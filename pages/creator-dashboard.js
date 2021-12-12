import { ethers } from "ethers";
import { useEffect, useState } from "react";
import axios from "axios";
import Web3Modal from "web3modal";

import NFTList from "../components/NFTList/NFTList";

import { nftmarketaddress, nftaddress } from "../config";

import NFT from "../artifacts/contracts/NFT.sol/NFT.json";
import Market from "../artifacts/contracts/NFTMarket.sol/NFTMarket.json";

const emptyCreatedListMessage = "No assets created";

export default function CreatorDashboard() {
  // TODO: Better naming
  const [nfts, setNfts] = useState([]);
  const [soldNfts, setSoldNfts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadNFTs();
  }, []);

  const loadNFTs = async () => {
    setIsLoading(true);

    const web3Modal = new Web3Modal({
      network: "mainnet",
      cacheProvider: true,
    });
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    const marketContract = new ethers.Contract(
      nftmarketaddress,
      Market.abi,
      signer
    );

    const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider);
    const data = await marketContract.fetchItemsCreated();

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
          sold: i.sold,
          image: meta.data.image,
          name: meta.data.name,
          description: meta.data.description,
        };
        return item;
      })
    );

    // create a filtered array of items that have been sold
    const soldItems = items.filter((i) => i.sold);
    setSoldNfts(soldItems);
    setNfts(items);
    setIsLoading(false);
  };
  if (!isLoading && !nfts.length)
    return <h1 className="py-10 px-20 text-3xl">No assets created</h1>;
  return (
    <div>
      <h2 className="text-2xl py-2">Items Created</h2>
      <NFTList
        nfts={nfts}
        // TODO: Add sell functionality
        // onHandleAction={handleDoSomeAction}
        isLoading={isLoading}
        emptyListMessage={emptyCreatedListMessage}
      />

      <h2 className="text-2xl py-2">Items sold</h2>
      <NFTList
        nfts={soldNfts}
        // TODO: Add sell functionality
        // onHandleAction={handleDoSomeAction}
        isLoading={isLoading}
        emptyListMessage={emptyCreatedListMessage}
      />
    </div>
  );
}
