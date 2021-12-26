import { useState, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import { CRYPTO_CURRENCY } from "../../utils/constants";
import Button from "../shared/Button";

const WalletInfo = () => {
  const [balance, setBalance] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { account, library, chainId } = useWeb3React();

  console.log({ isModalOpen });

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
    </div>
  );
};

export default WalletInfo;
