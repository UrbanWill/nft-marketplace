import Link from "next/link";
import PropTypes from "prop-types";

const propTypes = {
  navOptions: PropTypes.arrayOf(
    PropTypes.shape({
      route: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ),
  currentRoute: PropTypes.string.isRequired,
};

const Header = ({ navOptions, currentRoute }) => {
  return (
    <nav className="border-b p-6 sticky top-0 z-10 bg-white">
      <p className="text-4xl font-bold">Metaverse Marketplace</p>
      <div className="flex mt-4">
        {navOptions.map((option) => {
          const { route, label } = option;
          const isSelected = route === currentRoute;
          return (
            <Link href={route} key={route}>
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
    </nav>
  );
};

Header.propTypes = propTypes;
export default Header;
