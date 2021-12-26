import PropTypes from "prop-types";
import { useWeb3React } from "@web3-react/core";
import injected from "../../utils/connectors";

const propTypes = {
  onSetIsWalletPanelOpen: PropTypes.func.isRequired,
};

const WalletProvidersList = ({ onSetIsWalletPanelOpen }) => {
  const { active, activate, deactivate } = useWeb3React();

  //   TODO: Throw error/sucess modals
  const handleToggleConnect = async () => {
    if (active) {
      deactivate();
      onSetIsWalletPanelOpen(false);
    } else {
      await activate(injected)
        .then(() => {
          console.log("Connected wallet successfully");
        })
        .catch((err) => {
          console.log(err);
        });
    }
    onSetIsWalletPanelOpen(false);
  };
  return (
    <div className="px-6">
      <p className="py-4">
        Connect with one wallet provider or create a new one.
      </p>
      <div className="w-full bg-white rounded shadow">
        <ul className="divide-y-2 divide-gray-100">
          <li className="hover:shadow-lg cursor-pointer">
            <button
              className="p-3 w-full flex"
              type="button"
              onClick={handleToggleConnect}
            >
              MetaMask
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

WalletProvidersList.propTypes = propTypes;
export default WalletProvidersList;
