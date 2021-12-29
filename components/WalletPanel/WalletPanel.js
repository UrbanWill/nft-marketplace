import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  ChevronLeftIcon,
  UserCircleIcon,
  LogoutIcon,
} from "@heroicons/react/outline";
import { useWeb3React } from "@web3-react/core";
import SlideOverPanel from "../shared/SlideOverPanel/SlideOverPanel";
import useToggleWalletPanel from "../../hooks/contexts/useToggleWalletPanel";
import WalletProvidersList from "./WalletProvidersList";
import WalletInfo from "./WalletInfo";
import Dropdown from "../shared/Dropdown/Dropdown";

const propTyepes = {
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
        <div className="flex items-center border-b py-4 px-6">
          <button
            type="button"
            className="rounded-md text-gray-300 hover:text-black focus:outline-none focus:ring-2 focus:ring-white"
            // onClick={() => setIsWalletPanelOpen(false)}
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
        {account ? (
          <WalletInfo walletAddress={walletAddress} />
        ) : (
          <WalletProvidersList onSetIsWalletPanelOpen={setIsWalletPanelOpen} />
        )}
      </>
    </SlideOverPanel>
  );
};

WalletPanel.propTyepes = propTyepes;
export default WalletPanel;
