import PropTypes from "prop-types";
import { ChevronLeftIcon, UserCircleIcon } from "@heroicons/react/outline";
import SlideOverPanel from "../shared/SlideOverPanel/SlideOverPanel";
import useToggleWalletPanel from "../../hooks/contexts/useToggleWalletPanel";
import WalletProveidersList from "./WalletProvidersList";

const propTyepes = {
  isNavOpen: PropTypes.bool.isRequired,
};

const WalletPanel = ({ isNavOpen }) => {
  const { isWalletPanelOpen, setIsWalletPanelOpen } = useToggleWalletPanel();

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
            className="rounded-md text-gray-300 hover:text-black focus:outline-none focus:ring-2 focus:ring-white "
            onClick={() => setIsWalletPanelOpen(false)}
          >
            <span className="sr-only">Close panel</span>
            <ChevronLeftIcon
              className="h-6 w-6 mr-2 lg:hidden"
              aria-hidden="true"
            />
          </button>
          <UserCircleIcon
            className="h-8 w-8 text-pink-400 mr-2"
            aria-hidden="true"
          />
          <p className="font-bold">My wallet</p>
        </div>
        <WalletProveidersList onSetIsWalletPanelOpen={setIsWalletPanelOpen} />
      </>
    </SlideOverPanel>
  );
};

WalletPanel.propTyepes = propTyepes;
export default WalletPanel;
