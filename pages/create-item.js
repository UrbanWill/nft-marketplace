import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { create } from "ipfs-http-client";
import { useRouter } from "next/router";
import Web3Modal from "web3modal";
import { Formik, Form } from "formik";
import * as yup from "yup";

import { CRYPTO_CURRENCY } from "../utils/constants";

import useCreateNft from "../hooks/mutations/useCreateNft";

import Input from "../components/shared/Input";
import Textarea from "../components/shared/Textarea";
import ImageUpload from "../components/shared/ImageUpload/ImageUpload";

import Button from "../components/shared/Button";

import { nftaddress, nftmarketaddress } from "../config";

import Market from "../artifacts/contracts/NFTMarket.sol/NFTMarket.json";

const client = create("https://ipfs.infura.io:5001/api/v0");

export default function CreateItem() {
  const [uploadedImages, setUploadedImages] = useState([]);
  const [ipfsUrl, setIpfsUrl] = useState("");

  const { createNftMutation } = useCreateNft();

  const router = useRouter();

  const handleImageUpload = async (file) => {
    try {
      const added = await client.add(file, {
        progress: (prog) => console.log(`received: ${prog}`),
      });
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      setIpfsUrl(url);
    } catch (error) {
      // TODO: Throw error toast
      console.log("Error uploading file: ", error);
    }
  };

  useEffect(() => {
    if (uploadedImages.length) {
      handleImageUpload(uploadedImages[0]);
    }
  }, [uploadedImages]);

  const handleRemoveAllImages = () => {
    setUploadedImages([]);
    setIpfsUrl("");
  };

  // TODO: Separete concerns, Creating an Item and listing an item should be two different functions
  const createSale = async (tokenId, salePrice) => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    /* then list the item for sale on the marketplace */
    const price = ethers.utils.parseUnits(salePrice, CRYPTO_CURRENCY);
    const contract = new ethers.Contract(nftmarketaddress, Market.abi, signer);
    let listingPrice = await contract.getListingPrice();
    listingPrice = listingPrice.toString();

    const transaction = await contract.createMarketItem(
      nftaddress,
      tokenId,
      price,
      {
        value: listingPrice,
      }
    );
    await transaction.wait();
    router.push("/");
  };

  // TODO: Clean this function and use added.path from onImageUpload
  const createMarket = async (values) => {
    const { name, description, price } = values;
    /* first, upload to IPFS */
    const data = JSON.stringify({
      name,
      description,
      image: ipfsUrl,
    });
    try {
      const added = await client.add(data);
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      /* after file is uploaded to IPFS, pass the URL to save it on Polygon */

      createNftMutation(url).then(
        (res) => res.success && createSale(res.tokenId, price)
      );
    } catch (error) {
      // TODO: Throw error toast
      console.log("Error uploading file: ", error);
    }
  };

  const initialValues = {
    name: "",
    description: "",
    price: "",
  };

  const validationSchema = yup.object().shape({
    name: yup.string().required(),
    description: yup.string().required(),
    price: yup.string().required(),
  });

  // TODO: This is a function calling another function, DRY this up.
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
        {({ handleChange, isValid }) => (
          <Form className="w-1/2 flex flex-col pb-12">
            <Input
              name="name"
              onHandleChange={handleChange}
              label="Asset name"
              placeholder="Example: The real raw Mooncake"
              errorMessage="Asset name is a required field"
            />
            <Textarea
              name="description"
              onHandleChange={handleChange}
              label="Asset description"
              placeholder="Example: A planet-destroying spatial anomaly that was created by the residual energy"
              errorMessage="Asset description is a required field"
            />
            <Input
              name="price"
              // TODO: Add proper currency formatting, numbers only
              onHandleChange={handleChange}
              label="Asset price in ETH"
              placeholder="Example: 0.75"
              errorMessage="Asset price is a required field"
            />
            <ImageUpload
              onSetUploadedImages={setUploadedImages}
              ipfsUrl={ipfsUrl}
              handleRemoveImage={handleRemoveAllImages}
              isDisabled={!!ipfsUrl}
            />
            <Button
              label="Create Digital Asset"
              isDisabled={!isValid || !ipfsUrl}
              className="mt-4"
              isTypeSubmit
              size="lg"
            />
          </Form>
        )}
      </Formik>
    </div>
  );
}
