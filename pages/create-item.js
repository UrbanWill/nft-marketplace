import { ethers } from "ethers";
import { create as ipfsHttpClient } from "ipfs-http-client";
import { useRouter } from "next/router";
import Web3Modal from "web3modal";
import { Formik, Form } from "formik";
import * as yup from "yup";

import { nftaddress, nftmarketaddress } from "../config";

import NFT from "../artifacts/contracts/NFT.sol/NFT.json";
import Market from "../artifacts/contracts/NFTMarket.sol/NFTMarket.json";

const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");

export default function CreateItem() {
  const router = useRouter();

  const onImageUpload = async (e, setFieldValue) => {
    const file = e.target.files[0];
    try {
      // TODO: Moved added to state
      const added = await client.add(file, {
        progress: (prog) => console.log(`received: ${prog}`),
      });
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      setFieldValue("fileUrl", url);
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  };

  // TODO: Separete concerns, Creating an Item and listing an item should be two different functions
  const createSale = async (url, salePrice) => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    /* next, create the item */
    let contract = new ethers.Contract(nftaddress, NFT.abi, signer);
    let transaction = await contract.createToken(url);
    const tx = await transaction.wait();
    const event = tx.events[0];
    const value = event.args[2];
    const tokenId = value.toNumber();
    const price = ethers.utils.parseUnits(salePrice, "ether");

    /* then list the item for sale on the marketplace */
    contract = new ethers.Contract(nftmarketaddress, Market.abi, signer);
    let listingPrice = await contract.getListingPrice();
    listingPrice = listingPrice.toString();

    transaction = await contract.createMarketItem(nftaddress, tokenId, price, {
      value: listingPrice,
    });
    await transaction.wait();
    router.push("/");
  };

  // TODO: Clean this function and use added.path from onImageUpload
  const createMarket = async (values) => {
    const { name, description, price, fileUrl } = values;
    /* first, upload to IPFS */
    const data = JSON.stringify({
      name,
      description,
      image: fileUrl,
    });
    try {
      const added = await client.add(data);
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      /* after file is uploaded to IPFS, pass the URL to save it on Polygon */
      createSale(url, price);
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  };

  const initialValues = {
    name: "",
    description: "",
    price: "",
    fileUrl: "",
  };

  const validationSchema = yup.object().shape({
    name: yup.string().required(),
    description: yup.string().required(),
    price: yup.string().required(),
    fileUrl: yup.string().required(),
  });

  const handleSubmit = async (values) => {
    createMarket(values);
  };

  return (
    <div className="flex justify-center">
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validateOnMount
        validationSchema={validationSchema}
      >
        {({ values, handleChange, isValid, setFieldValue }) => (
          <Form className="w-1/2 flex flex-col pb-12">
            <input
              name="name"
              placeholder="Asset Name"
              className="mt-8 border rounded p-4"
              onChange={handleChange}
            />
            <input
              name="description"
              placeholder="Asset description"
              className="mt-8 border rounded p-4"
              onChange={handleChange}
            />
            <input
              name="price"
              placeholder="Asset price in ETH"
              className="mt-8 border rounded p-4"
              onChange={handleChange}
            />
            <input
              type="file"
              name="fileUrl"
              className="my-4"
              onChange={(e) => onImageUpload(e, setFieldValue)}
            />
            {values.fileUrl && (
              // TODO: Use next image when refactoring this component
              // eslint-disable-next-line @next/next/no-img-element
              <img
                className="rounded mt-4"
                width="350"
                src={values.fileUrl}
                alt="uploaded nft"
              />
            )}
            <button
              type="submit"
              className={`font-bold mt-4 text-white rounded p-4 shadow-lg ${
                isValid ? "bg-pink-500" : "bg-red-500 cursor-not-allowed"
              }`}
            >
              Create Digital Asset
            </button>
            <pre>{JSON.stringify(values, null, 2)}</pre>
          </Form>
        )}
      </Formik>
    </div>
  );
}
