import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Image from "next/image";
import { useWeb3React } from "@web3-react/core";
import { Formik, Form } from "formik";
import * as yup from "yup";
import Button from "../shared/Button/Button";
import Spinner from "../shared/Spinner/Spinner";

import useGetNft from "../../hooks/queries/useGetNft";
import useGetMarketNftHistory from "../../hooks/queries/useGetMarketNftHistory";

import useRemoveListedNft from "../../hooks/mutations/useRemoveListedNft";
import useBuyNft from "../../hooks/mutations/useBuyNft";
import useListNft from "../../hooks/mutations/useListNft";

import useToggleWalletPanel from "../../hooks/contexts/useToggleWalletPanel";

import Input from "../shared/Input/Input";

import maticIcon from "../../assets/images/polygon-matic.svg";

import { ACTION_TYPES } from "../../utils/constants";

const { LIST_ITEM, REMOVE_ITEM, BUY } = ACTION_TYPES;

const propTypes = {
  nftId: PropTypes.string.isRequired,
};

const NftItem = ({ nftId }) => {
  const [action, setAction] = useState(BUY);
  const {
    data,
    isLoading: isGetNftLoading,
    error,
    refetch: refetchNft,
  } = useGetNft(Number(nftId));
  const {
    data: marketNftHistory,
    refetch: refetchHistory,
    isLoading: isGetMarketLoading,
  } = useGetMarketNftHistory(Number(nftId));

  const { setIsWalletPanelOpen } = useToggleWalletPanel();

  const { removeListingNftMutation, isLoading: isRemoveLoading } =
    useRemoveListedNft();
  const { buyNftMutation, isLoading: isBuyLoading } = useBuyNft();
  const { listNftMutation, isLoading: isListLoading } = useListNft();

  const isLoading =
    isGetNftLoading ||
    isGetMarketLoading ||
    isRemoveLoading ||
    isBuyLoading ||
    isListLoading;

  const { account, active } = useWeb3React();

  const { name, description, image, owner: tokenOwner } = data;

  const currentMarketListing =
    marketNftHistory[marketNftHistory.length - 1] || {};

  const { price, sold, itemId, seller } = currentMarketListing;

  const isOwner = account === tokenOwner || account === seller;
  // canListItem is true if the item has never been listed before and isOwner
  // or is owner and item is currently not for sale
  const canListItem = (!itemId && isOwner) || (isOwner && sold);
  //  canRemoveItem is true only if user is logged in, there is an item, is not sold and seller is the owner
  const canRemoveItem = !!active && !sold && !!itemId && isOwner;

  useEffect(() => {
    if (canListItem) {
      return setAction(LIST_ITEM);
    }
    if (canRemoveItem) {
      return setAction(REMOVE_ITEM);
    }
    return setAction(BUY);
  }, [canListItem, canRemoveItem]);

  const handleBuy = () => {
    if (!active) {
      // Opens wallet panel for user to connect wallet before making a purchase
      return setIsWalletPanelOpen(true);
    }
    return buyNftMutation({ itemId, price });
  };

  const actions = {
    [LIST_ITEM]: {
      label: "List item",
      action: (listingPrice) => listNftMutation(nftId, listingPrice),
    },
    [REMOVE_ITEM]: {
      label: "Remove item",
      action: () => removeListingNftMutation(itemId),
    },
    [BUY]: {
      label: "Buy",
      action: () => handleBuy(),
    },
  };

  if (isGetNftLoading) {
    return (
      <div className="flex justify-center items-center flex-1">
        <Spinner size="10" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center flex-1">
        <h1 className="text-2xl">Item do not exist</h1>
      </div>
    );
  }

  const handleSubmit = (values) => {
    actions[action].action(String(values.price)).then(() => {
      refetchNft();
      refetchHistory();
    });
  };

  const initialValues = {
    price: "",
  };

  const validationSchema = yup.object().shape({
    price: yup.number().when({
      is: () => action === LIST_ITEM,
      then: yup.number().min(0.000000000000000001).required(),
      otherwise: yup.number(),
    }),
  });

  return (
    <div className="flex justify-center pt-10">
      <div className="w-full md:w-5/6  xl:w-2/3 2xl:w-3/5 border-2 p-10 rounded-xl">
        <div className="flex flex-col lg:flex-row">
          <div className="h-96 sm:w-96 relative rounded-xl lg:mr-4">
            <Image
              src={image}
              alt="NFT image"
              layout="fill"
              objectFit="cover"
              objectPosition="top center"
              className="rounded-xl"
            />
          </div>
          <div className="flex-1 flex flex-col justify-between pt-5">
            <h1 className="text-2xl font-bold">{`${name} #${nftId}`}</h1>
            <p className="font-medium">{description}</p>
            {!sold && !canListItem && (
              <div>
                <p className="font-medium py-2">Price</p>
                <div className="flex items-center">
                  <Image
                    src={maticIcon}
                    alt="Metamask logo"
                    height={24}
                    width={24}
                  />
                  <p className="font-bold text-2xl ml-2">{price}</p>
                </div>
              </div>
            )}
            <Formik
              initialValues={initialValues}
              onSubmit={handleSubmit}
              validationSchema={validationSchema}
              validateOnMount
            >
              {({ isValid }) => (
                <Form>
                  {canListItem && (
                    <Input
                      name="price"
                      label="Asset price in ETH"
                      placeholder="Example: 0.75"
                      errorMessage="Asset price is a required field"
                      type="number"
                    />
                  )}
                  <Button
                    label={actions[action].label}
                    isDisabled={(sold && !isOwner) || !isValid}
                    isLoading={isLoading}
                    className="mt-4 w-full"
                    isTypeSubmit
                    size="lg"
                  />
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

NftItem.propTypes = propTypes;

export default NftItem;
