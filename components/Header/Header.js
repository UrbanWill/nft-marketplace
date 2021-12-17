import Link from "next/link";
import PropTypes from "prop-types";
import { useWeb3React } from "@web3-react/core";
import Button from "../shared/Button";
import injected from "../../utils/connectors";

const propTypes = {
  navOptions: PropTypes.arrayOf(
    PropTypes.shape({
      route: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  currentRoute: PropTypes.string.isRequired,
};

const Header = ({ navOptions, currentRoute }) => {
  const { active, activate, deactivate } = useWeb3React();

  const handleToggleConnect = async () => {
    try {
      if (active) {
        deactivate();
      } else {
        await activate(injected);
      }
    } catch (error) {
      // TODO: Throw error modal
      console.log(error);
    }
  };

  const buttonLabel = active ? "Disconnect walled" : "Connect wallet";

  return (
    <nav className="border-b p-6 pb-4 sticky top-0 z-50 bg-white">
      <p className="text-4xl font-bold">Metaverse Marketplace</p>
      <div className="flex items-center justify-between mt-4">
        <div>
          {navOptions.map((option) => {
            const { route, label } = option;
            const isSelected = route === currentRoute;
            return (
              <Link href={route} key={route} passHref>
                <a
                  className={`p-2 ${
                    isSelected
                      ? "bg-black rounded-md text-white"
                      : "text-pink-500"
                  }`}
                >
                  {label}
                </a>
              </Link>
            );
          })}
        </div>
        <Button label={buttonLabel} onHandleClick={handleToggleConnect} />
      </div>
    </nav>
  );
};

Header.propTypes = propTypes;
export default Header;
