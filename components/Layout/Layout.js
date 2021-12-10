import Header from "../Header/Header";
import Meta from "../Meta/Meta";

import { useRouter } from "next/router";

import { HEADER_ROUTES } from "../../utils/constants";

const { HOME, CREATE_ITEM, MY_ASSETS, CREATOR_DASHBOARD } = HEADER_ROUTES;

const navOptions = [
  { route: HOME, label: "Home" },
  { route: CREATE_ITEM, label: "Sell digital asset" },
  { route: MY_ASSETS, label: "My digital Assets" },
  { route: CREATOR_DASHBOARD, label: "CreatordDashboard" },
];

const defaultMetaTitle = "Metaverse";

const Layout = ({ children }) => {
  const { route } = useRouter();

  const routeTitle = navOptions.find((option) => option.route === route)?.label;

  return (
    <>
      <Meta title={`${defaultMetaTitle} ${routeTitle}`} />
      <div className="max-w-screen-2xl">
        <Header currentRoute={route} navOptions={navOptions} />
        <div className="px-4">{children}</div>
      </div>
    </>
  );
};

export default Layout;
