import { useState } from "react";
import { useRouter } from "next/router";
import { ToastContainer } from "react-toastify";
import { useWeb3React } from "@web3-react/core";
import { ExclamationIcon } from "@heroicons/react/solid";

// hooks
import useToggleWalletPanel from "../../hooks/contexts/useToggleWalletPanel";

// components
import Header from "../Header/Header";
import HeaderNavPanel from "../Header/HeaderNavPanel";
import Meta from "../Meta/Meta";
import WalletPanel from "../WalletPanel/WalletPanel";

// styles
import "react-toastify/dist/ReactToastify.css";

// utils
import { changeNetwork } from "../../utils/wallet";

import { HEADER_ROUTES } from "../../utils/constants";

const { HOME, CREATE_ITEM, MY_ASSETS, CREATOR_DASHBOARD } = HEADER_ROUTES;

const navOptions = [
  { route: HOME, label: "Home" },
  { route: CREATE_ITEM, label: "Create digital asset" },
  { route: MY_ASSETS, label: "My digital assets" },
  { route: CREATOR_DASHBOARD, label: "Creator dashboard" },
];

const defaultMetaTitle = "Metaverse";

const contextClass = {
  success: "bg-green-200 text-green-600",
  error: "bg-red-600",
  default: "bg-gray-300",
  warning: "bg-yellow-200 text-yellow-600",
};
/**
 * Renders default app layout style
 */
const Layout = ({ children }) => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const { isWalletPanelOpen, setIsWalletPanelOpen } = useToggleWalletPanel();
  const { route, query } = useRouter();

  const { chainId, active } = useWeb3React();

  const routeTitle =
    navOptions.find((option) => option.route === route)?.label ||
    `#${query.nft || "0000"}`;

  return (
    /** pt-20 to match navbar height */
    <div className="min-h-screen flex flex-col overflow-x-hidden pt-20">
      {/* toast config */}
      <ToastContainer
        toastClassName={({ type }) =>
          `${
            contextClass[type || "default"]
          } relative flex p-1 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer mb-2`
        }
        bodyClassName={() => "flex text-sm font-white font-med block p-3"}
        position="bottom-right"
        pauseOnFocusLoss={false}
        autoClose={3000}
        closeOnClick
      />
      {/* meta component for browser description */}
      <Meta title={`${defaultMetaTitle} ${routeTitle || query.nft}`} />
      {/* div tag with modal id for modal to be rendered with react createPortal */}
      <div id="modal" />
      <Header
        currentRoute={route}
        navOptions={navOptions}
        isNavOpen={isNavOpen}
        onSetIsNavOpen={setIsNavOpen}
      />
      {chainId !== 80001 && active && (
        <div className="bg-yellow-200 text-yellow-600 h-12 flex items-center justify-center">
          <ExclamationIcon className="h-6 w-6 mr-2" />
          <span>Please click</span>
          <button
            type="button"
            onClick={changeNetwork}
            className="underline m-1"
          >
            here
          </button>
          <span>to switch to Polygon test net</span>
        </div>
      )}
      {/* div with relative class needed to render slideover panel */}
      <div className="relative">
        <HeaderNavPanel
          isNavOpen={isNavOpen}
          onSetIsNavOpen={setIsNavOpen}
          onSetIsWalletPanelOpen={setIsWalletPanelOpen}
          isWalletPanelOpen={isWalletPanelOpen}
          navOptions={navOptions}
        />
        <WalletPanel isNavOpen={isNavOpen} />
      </div>
      <div
        className="p-4 lg:px-8 flex flex-col flex-1 bg-gray-50"
        id="layout-body"
      >
        {children}
      </div>
    </div>
  );
};

export default Layout;
