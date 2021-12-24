import { useState } from "react";
import { useRouter } from "next/router";
import Header from "../Header/Header";
import HeaderNavPanel from "../Header/HeaderNavPanel";
import Meta from "../Meta/Meta";
import useToggleWalletPanel from "../../hooks/contexts/useToggleWalletPanel";
import WalletPanel from "../WalletPanel/WalletPanel";

import { HEADER_ROUTES } from "../../utils/constants";

const { HOME, CREATE_ITEM, MY_ASSETS, CREATOR_DASHBOARD } = HEADER_ROUTES;

const navOptions = [
  { route: HOME, label: "Home" },
  { route: CREATE_ITEM, label: "Sell digital asset" },
  { route: MY_ASSETS, label: "My digital assets" },
  { route: CREATOR_DASHBOARD, label: "Creatord dashboard" },
];

const defaultMetaTitle = "Metaverse";

const Layout = ({ children }) => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const { isWalletPanelOpen, setIsWalletPanelOpen } = useToggleWalletPanel();
  const { route } = useRouter();

  const routeTitle = navOptions.find((option) => option.route === route)?.label;

  return (
    <>
      <Meta title={`${defaultMetaTitle} ${routeTitle}`} />
      <div>
        <Header
          currentRoute={route}
          navOptions={navOptions}
          isNavOpen={isNavOpen}
          onSetIsNavOpen={setIsNavOpen}
        />
        <div className="relative">
          <HeaderNavPanel
            isNavOpen={isNavOpen}
            onSetIsNavOpen={setIsNavOpen}
            onSetIsWalletPanelOpen={setIsWalletPanelOpen}
            isWalletPanelOpen={isWalletPanelOpen}
            navOptions={navOptions}
          />
          <WalletPanel isNavOpen={isNavOpen} />
          <div className="p-4" id="layout-body">
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
