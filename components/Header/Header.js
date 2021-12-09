import Link from "next/link";

import { HEADER_ROUTES } from "../../utils/constants";

const { HOME, CREATE_ITEM, MY_ASSETS, CREATOR_DASHBOARD } = HEADER_ROUTES;

const ROUTES_LABELS = {
  [HOME]: "Home",
  [CREATE_ITEM]: "Sell digital asset",
  [MY_ASSETS]: "My Digital Assets",
  [CREATOR_DASHBOARD]: "Creator Dashboard",
};

const Header = () => {
  return (
    <nav className="border-b p-6">
      <p className="text-4xl font-bold">Metaverse Marketplace</p>
      <div className="flex mt-4">
        {Object.values(HEADER_ROUTES).map((route) => {
          return (
            <Link href={`/${route}`} key={route}>
              <a className="mr-4 text-pink-500">{ROUTES_LABELS[route]}</a>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default Header;
