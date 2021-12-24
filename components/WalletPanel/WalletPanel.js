import PropTypes from "prop-types";
import { XIcon } from "@heroicons/react/outline";
import SlideOverPanel from "../shared/SlideOverPanel/SlideOverPanel";
import useToggleWalletPanel from "../../hooks/contexts/useToggleWalletPanel";

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
        <button
          type="button"
          className="rounded-md text-gray-300 hover:text-black focus:outline-none focus:ring-2 focus:ring-white pt-2"
          onClick={() => setIsWalletPanelOpen(false)}
        >
          <span className="sr-only">Close panel</span>
          <XIcon className="h-6 w-6" aria-hidden="true" />
        </button>
        <p>Wallet</p>
      </>
    </SlideOverPanel>
  );
};

WalletPanel.propTyepes = propTyepes;
export default WalletPanel;
