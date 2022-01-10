import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useWeb3React } from "@web3-react/core";
import { create } from "ipfs-http-client";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import useToggleWalletPanel from "../hooks/contexts/useToggleWalletPanel";

import useCreateNft from "../hooks/mutations/useCreateNft";
import useListNft from "../hooks/mutations/useListNft";

import Input from "../components/shared/Input/Input";
import Textarea from "../components/shared/Textarea/Textarea";
import ImageUpload from "../components/shared/ImageUpload/ImageUpload";

import Button from "../components/shared/Button/Button";

const client = create("https://ipfs.infura.io:5001/api/v0");
const ipfsInfuraUrl = "https://ipfs.infura.io/ipfs";

// TODO: Refactor this page, it should only be handling minting assets, not listing.
export default function CreateItem() {
  const [uploadedImages, setUploadedImages] = useState([]);
  const [ipfsUrl, setIpfsUrl] = useState("");
  const [isIpfsLoading, setIsIpfsLoading] = useState(false);
  const { setIsWalletPanelOpen } = useToggleWalletPanel();
  const { active } = useWeb3React();
  const router = useRouter();

  const { createNftMutation, isLoading: isNftCreateLoading } = useCreateNft();
  const { listNftMutation, isLoading: isNftListLoading } = useListNft();

  const isMutationLoading = isNftCreateLoading || isNftListLoading;

  // TODO: handleIpfsUpload should be a hook
  /**
   * function to upload data to ipfs
   * @param {File | object} File or file data to be uploaded to ipfs
   * @returns {Promise < Object >} ipfs data
   */
  const handleIpfsUpload = async (data) => {
    setIsIpfsLoading(true);
    return client
      .add(data)
      .then((createNftReceipt) => {
        setIsIpfsLoading(false);
        return createNftReceipt;
      })
      .catch((error) => {
        toast.error(`Failed to upload file to IPFS ${error}`);
      });
  };

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
      return setIsWalletPanelOpen(true);
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
      (createNftReceipt) =>
        createNftReceipt.status &&
        listNftMutation(createNftReceipt.tokenId, String(price)).then(
          (listingReceipt) => listingReceipt.status && router.push("/")
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
          <Form className="w-full md:w-5/6 xl:w-2/3 2xl:w-3/5">
            <h1 className="py-10 text-2xl font-bold">Create new item</h1>
            <div className="flex flex-col lg:flex-row">
              <ImageUpload
                onSetUploadedImages={setUploadedImages}
                imgPreviewUrl={uploadedImages[0]?.preview || ""}
                handleRemoveImage={handleRemoveAllImages}
                isDisabled={!!uploadedImages[0]?.preview}
                isLoading={isIpfsLoading}
                className="lg:mr-4"
              />
              <div className="flex-1 flex flex-col justify-between">
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
                  placeholder="Example: A planet-destroying spatial anomaly that was created by the residual energy of an anti-matter bomb"
                  errorMessage="Asset description is a required field"
                />
                <Input
                  name="price"
                  onHandleChange={handleChange}
                  label="Asset price in ETH"
                  placeholder="Example: 0.75"
                  errorMessage="Asset price is a required field"
                  type="number"
                />
                <Button
                  label="Create Digital Asset"
                  isDisabled={!isValid || !ipfsUrl || isMutationLoading}
                  isLoading={isIpfsLoading || isMutationLoading}
                  className="mt-4 w-full"
                  isTypeSubmit
                  size="lg"
                />
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
