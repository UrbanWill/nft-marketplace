import Link from "next/link";
import { useRouter } from "next/router";

import { HEADER_ROUTES } from "../../utils/constants";

const { HOME, CREATE_ITEM, MY_ASSETS, CREATOR_DASHBOARD } = HEADER_ROUTES;

const ROUTES_LABELS = {
  [HOME]: "Home",
  [CREATE_ITEM]: "Sell digital asset",
  [MY_ASSETS]: "My Digital Assets",
  [CREATOR_DASHBOARD]: "Creator Dashboard",
};

const Header = () => {
  const { route } = useRouter();

  const parsedRoute = route.substring(1);

  return (
    <nav className="border-b p-6">
      <p className="text-4xl font-bold">Metaverse Marketplace</p>
      <div className="flex mt-4">
        {Object.values(HEADER_ROUTES).map((headerRoute) => {
          const isSelected = headerRoute === parsedRoute;
          return (
            <Link href={`/${headerRoute}`} key={headerRoute}>
              <a
                className={`p-2 ${
                  isSelected
                    ? "bg-black rounded-md text-white"
                    : "text-pink-500"
                }`}
              >
                {ROUTES_LABELS[headerRoute]}
              </a>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default Header;
