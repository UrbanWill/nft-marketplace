import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useWeb3React } from "@web3-react/core";
import { create } from "ipfs-http-client";
import { Formik, Form } from "formik";
import * as yup from "yup";

import useCreateNft from "../hooks/mutations/useCreateNft";
import useListNft from "../hooks/mutations/useListNft";

import Input from "../components/shared/Input";
import Textarea from "../components/shared/Textarea";
import ImageUpload from "../components/shared/ImageUpload/ImageUpload";

import Button from "../components/shared/Button";

const client = create("https://ipfs.infura.io:5001/api/v0");
const ipfsInfuraUrl = "https://ipfs.infura.io/ipfs";

// TODO: Refactor this page, it should only be handling minting assets, not listing.
export default function CreateItem() {
  const [uploadedImages, setUploadedImages] = useState([]);
  const [ipfsUrl, setIpfsUrl] = useState("");

  const { active } = useWeb3React();
  const router = useRouter();
  const { createNftMutation } = useCreateNft();
  const { listNftMutation } = useListNft();

  /**
   * function to upload data to ipfs
   * @param {File | object} File or file data to be uploaded to ipfs
   * @returns {Promise < Object >} ipfs data
   */
  const handleIpfsUpload = async (data) =>
    client
      .add(data)
      .then((res) => res)
      .catch((error) => {
        // TODO: error toast
        console.log("Error uploading file: ", error);
      });

  /* Make an upload to ipfs and sets ipfsUrl whenever an image is uploaded */
  useEffect(() => {
    const ipfsUploadData = async () => {
      const ipfsData = await handleIpfsUpload(uploadedImages[0]);
      setIpfsUrl(`${ipfsInfuraUrl}/${ipfsData.path}`);
    };
    if (uploadedImages.length) {
      ipfsUploadData();
    }
  }, [uploadedImages]);

  /* Clears uploaded iamges and ipfs url state */
  const handleRemoveAllImages = () => {
    setUploadedImages([]);
    setIpfsUrl("");
  };

  const handleSubmit = async (values) => {
    const { name, description, price } = values;
    if (!active) {
      // TODO: Open "connect your wallet" modal
      // eslint-disable-next-line no-alert
      return window.alert("Connect your wallet to make a purchase");
    }

    const data = JSON.stringify({
      name,
      description,
      image: ipfsUrl,
    });
    const uploadedData = await handleIpfsUpload(data);
    const url = `${ipfsInfuraUrl}/${uploadedData.path}`;

    // TODO: Refactor this page, it should only be handling minting assets, not listing.
    /* Mints a new nft then list it */
    return createNftMutation(url).then(
      (res) =>
        res.success &&
        listNftMutation(res.tokenId, String(price)).then(
          (listingResponse) => listingResponse.success && router.push("/")
        )
    );
  };

  const initialValues = {
    name: "",
    description: "",
    price: "",
  };

  const validationSchema = yup.object().shape({
    name: yup.string().required(),
    description: yup.string().required(),
    price: yup.number().required(),
  });

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
              type="number"
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
