import { useWeb3React } from "@web3-react/core";
import Image from "next/image";
import { toast } from "react-toastify";
import { injected, fortmatic } from "../../utils/connectors";

import MetaMaskLogo from "../../assets/images/metamask-logo.webp";
import FortmaticLogo from "../../assets/images/fortmatic-logo.webp";

const connectors = {
  Injected: {
    name: "Metamask",
    logo: <Image src={MetaMaskLogo} alt="Metamask logo" />,
    method: injected,
  },
  Fortmatic: {
    name: "Fortmatic",
    logo: <Image src={FortmaticLogo} alt="FortmaticLogo logo" />,
    method: fortmatic,
  },
};

const isMobileDevice = () =>
  "ontouchstart" in window || "onmsgesturechange" in window;

const dappUrl = "nft-marketplace-dusky.vercel.app/";

const metamaskAppDeepLink = `https://metamask.app.link/dapp/${dappUrl}`;

const WalletProvidersList = () => {
  const { active, activate, deactivate } = useWeb3React();

  //   TODO: Throw error/success modals
  const handleToggleConnect = async (connector, methodName) => {
    if (methodName === "Metamask" && !window.ethereum) {
      toast.warn("Please install Metamask");
      return;
    }
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

            if (isMobileDevice() && name === "Metamask" && !window.ethereum) {
              return (
                <li className="shadow-around cursor-pointer" key={name}>
                  <a href={metamaskAppDeepLink}>
                    <button
                      className="p-3 w-full flex items-center font-bold"
                      type="button"
                    >
                      <div className="h-full w-6 mr-4 relative flex">
                        {logo}
                      </div>
                      {name}
                    </button>
                  </a>
                </li>
              );
            }

            return (
              <li className="shadow-around cursor-pointer" key={name}>
                <button
                  className="p-3 w-full flex items-center font-bold"
                  type="button"
                  onClick={() => handleToggleConnect(method, name)}
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
