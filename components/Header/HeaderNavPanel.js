import { useRouter } from "next/router";
import PropTypes from "prop-types";
import {
  CubeTransparentIcon,
  HomeIcon,
  CurrencyDollarIcon,
  CollectionIcon,
  ViewGridIcon,
} from "@heroicons/react/outline";
import SlideOverPanel from "../shared/SlideOverPanel/SlideOverPanel";
import Button from "../shared/Button/Button";
import useToggleWalletPanel from "../../hooks/contexts/useToggleWalletPanel";
import { HEADER_ROUTES } from "../../utils/constants";

const { HOME, CREATE_ITEM, MY_ASSETS, CREATOR_DASHBOARD } = HEADER_ROUTES;

const propTypes = {
  isNavOpen: PropTypes.bool.isRequired,
  onSetIsNavOpen: PropTypes.func.isRequired,
  navOptions: PropTypes.arrayOf(
    PropTypes.shape({
      route: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
};

const navIcons = {
  [HOME]: (
    <HomeIcon className="h-8 w-8 mr-3 text-pink-400" aria-hidden="true" />
  ),
  [CREATE_ITEM]: (
    <CurrencyDollarIcon
      className="h-8 w-8 mr-3 text-pink-400"
      aria-hidden="true"
    />
  ),
  [MY_ASSETS]: (
    <CollectionIcon className="h-8 w-8 mr-3 text-pink-400" aria-hidden="true" />
  ),
  [CREATOR_DASHBOARD]: (
    <ViewGridIcon className="h-8 w-8 mr-3 text-pink-400" aria-hidden="true" />
  ),
};

const HeaderNavPanel = ({ isNavOpen, onSetIsNavOpen, navOptions }) => {
  const router = useRouter();
  const { isWalletPanelOpen, setIsWalletPanelOpen } = useToggleWalletPanel();

  const handleClick = (href) => {
    onSetIsNavOpen(false);
    router.push(href);
  };

  return (
    <SlideOverPanel
      isOpen={isNavOpen}
      onSetIsOpen={onSetIsNavOpen}
      shouldStayOpen={isWalletPanelOpen}
    >
      <div className="flex flex-col h-full py-2 px-6">
        <div className="">
          {navOptions.map((option) => {
            const { route, label } = option;
            return (
              <div key={route} className="py-4">
                <button
                  type="button"
                  className="flex items-center hover:text-pink-400"
                  onClick={() => handleClick(route)}
                >
                  {navIcons[route]}
                  <span className="font-bold">{label}</span>
                </button>
              </div>
            );
          })}
        </div>
        <Button
          label="Connect wallet"
          icon={
            <CubeTransparentIcon className="h-6 w-6 mr-2" aria-hidden="true" />
          }
          onHandleClick={() => setIsWalletPanelOpen((prev) => !prev)}
          className="mt-auto mb-2 p-3"
        />
      </div>
    </SlideOverPanel>
  );
};

HeaderNavPanel.propTypes = propTypes;
export default HeaderNavPanel;
