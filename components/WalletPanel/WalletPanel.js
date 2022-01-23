import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  ChevronLeftIcon,
  UserCircleIcon,
  LogoutIcon,
} from "@heroicons/react/outline";
import { useWeb3React } from "@web3-react/core";
import { toast } from "react-toastify";
import SlideOverPanel from "../shared/SlideOverPanel/SlideOverPanel";
import useToggleWalletPanel from "../../hooks/contexts/useToggleWalletPanel";
import WalletProvidersList from "./WalletProvidersList";
import WalletInfo from "./WalletInfo";
import Dropdown from "../shared/Dropdown/Dropdown";
import shortenWalletAddress from "../../utils/shortenWalletAddress";

const propTypes = {
  isNavOpen: PropTypes.bool.isRequired,
};

const WalletPanel = ({ isNavOpen }) => {
  const { isWalletPanelOpen, setIsWalletPanelOpen } = useToggleWalletPanel();
  const [walletAddress, setWalletAddress] = useState("");
  const { account, deactivate } = useWeb3React();

  useEffect(() => {
    if (account) {
      return setWalletAddress(account);
    }
    return setWalletAddress("");
  }, [account]);

  const handleWalletDisconnect = (event) => {
    event.stopPropagation();
    deactivate();
    toast.warn("Wallet disconnected successfully");
  };

  const dropdownOptions = [
    {
      label: "Logout",
      value: "logout",
      action: handleWalletDisconnect,
      icon: (
        <LogoutIcon className="h-6 w-6 mr-2 text-pink-400" aria-hidden="true" />
      ),
    },
  ];

  return (
    <SlideOverPanel
      isOpen={isWalletPanelOpen}
      onSetIsOpen={setIsWalletPanelOpen}
      isNavOpen={isNavOpen}
    >
      <>
        <div className="flex items-center border-b py-4 px-6 justify-between">
          <div className="flex items-center">
            <button
              type="button"
              className="rounded-md text-gray-300 hover:text-black focus:outline-none focus:ring-2 focus:ring-white"
              onClick={() => setIsWalletPanelOpen(false)}
            >
              <span className="sr-only">Close panel</span>
              <ChevronLeftIcon
                className="h-6 w-6 mr-2 lg:hidden"
                aria-hidden="true"
              />
            </button>
            <Dropdown
              label="My wallet"
              options={account ? dropdownOptions : []}
              icon={
                <UserCircleIcon
                  className="h-12 w-12 text-pink-400 mr-2"
                  aria-hidden="true"
                />
              }
            />
          </div>
          {account && (
            <button
              type="button"
              onClick={() => {
                navigator.clipboard.writeText(account);
                toast.success("Copied wallet dddress!");
              }}
            >
              <span className="text-sm text-gray-500">
                {shortenWalletAddress(account)}
              </span>
            </button>
          )}
        </div>
        {account ? (
          <WalletInfo walletAddress={walletAddress} />
        ) : (
          <WalletProvidersList />
        )}
      </>
    </SlideOverPanel>
  );
};

WalletPanel.propTypes = propTypes;
export default WalletPanel;
