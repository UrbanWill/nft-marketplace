import { useWeb3React } from "@web3-react/core";
import Image from "next/image";
import { injected, fortmatic } from "../../utils/connectors";

import MetaMaskLogo from "../../assets/images/metamask-logo.webp";
import FortmaticLogo from "../../assets/images/fortmatic-logo.webp";

const connectors = {
  Injected: {
    name: "MetaMask",
    logo: <Image src={MetaMaskLogo} alt="Metamask logo" />,
    method: injected,
  },
  Fortmatic: {
    name: "Fortmatic",
    logo: <Image src={FortmaticLogo} alt="FortmaticLogo logo" />,
    method: fortmatic,
  },
};

const WalletProvidersList = () => {
  const { active, activate, deactivate } = useWeb3React();

  //   TODO: Throw error/sucess modals
  const handleToggleConnect = async (connector) => {
    if (active) {
      deactivate();
    } else {
      await activate(connector)
        .then(() => {
          console.log("Connected wallet successfully");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <div className="px-6">
      <p className="py-4">
        Connect with one wallet provider or create a new one.
      </p>
      <div className="w-full bg-white rounded shadow">
        <ul className="divide-y-2 divide-gray-100">
          {Object.values(connectors).map((connector) => {
            const { name, logo, method } = connector;
            return (
              <li className="shadow-around cursor-pointer" key={name}>
                <button
                  className="p-3 w-full flex items-center font-bold"
                  type="button"
                  onClick={() => handleToggleConnect(method)}
                >
                  <div className="h-full w-6 mr-4 relative flex">{logo}</div>
                  {name}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default WalletProvidersList;
