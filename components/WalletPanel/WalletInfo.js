import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import { CubeTransparentIcon } from "@heroicons/react/outline";
import { toast } from "react-toastify";
import { CRYPTO_CURRENCY } from "../../utils/constants";
import Button from "../shared/Button/Button";
import Modal from "../shared/Modal/Modal";

const propTypes = {
  walletAddress: PropTypes.string.isRequired,
};

const WalletInfo = ({ walletAddress }) => {
  const [balance, setBalance] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { account, library, chainId } = useWeb3React();

  useEffect(() => {
    if (!!account && !!library) {
      let stale = false;

      library
        .getBalance(account)
        .then((bal) => {
          if (!stale) {
            setBalance(
              ethers.utils.formatUnits(bal?.toString(), CRYPTO_CURRENCY)
            );
          }
        })
        .catch(() => {
          if (!stale) {
            setBalance(null);
          }
        });

      return () => {
        stale = true;
        setBalance(0);
      };
    }
    return null;
  }, [account, library, chainId]);

  const modalBody = (
    <div className="flex flex-col">
      <CubeTransparentIcon
        className="h-16 w-16 self-center text-pink-500 my-2 transform rotate-12"
        aria-hidden="true"
      />
      <p className="py-2">Transfer funds to your wallet address below:</p>
      <div className="flex flex-col truncate lg:flex-row">
        <span className="bg-gray-100 p-2 rounded border-2 text-sm truncate lg:overflow-visible">
          {walletAddress}
        </span>
        <Button
          label="Copy"
          className="mt-2 px-6 lg:ml-2 lg:my-0"
          onHandleClick={() => {
            navigator.clipboard.writeText(walletAddress);
            toast.success("Copied wallet address!");
          }}
        />
      </div>
    </div>
  );

  const handleModalClose = (event) => {
    event.stopPropagation();
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col">
      <div className="border-2 m-6 mb-0 flex flex-col items-center rounded-b-none">
        <h1 className="font-bold text-gray-400 p-2">Total balance</h1>
        <div className="flex font-bold p-4">
          <span className="text-pink-400 mr-2">ETH</span>
          <span>{balance}</span>
        </div>
      </div>
      <Button
        label="Add funds"
        className="p-4 mx-6 rounded-t-none"
        onHandleClick={() => setIsModalOpen(true)}
      />
      <Modal
        isOpen={isModalOpen}
        title="Add funds"
        onHandleModalClose={handleModalClose}
      >
        {modalBody}
      </Modal>
    </div>
  );
};

WalletInfo.propTypes = propTypes;
export default WalletInfo;
