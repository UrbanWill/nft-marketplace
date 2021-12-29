import PropTypes from "prop-types";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";

import classNames from "../../../utils/classNames";

const propTypes = {
  icon: PropTypes.node,
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      action: PropTypes.func.isRequired,
      value: PropTypes.string.isRequired,
    })
  ).isRequired,
};

const Dropdown = ({ icon, label, options }) => (
  <Menu as="div" className="relative inline-block text-left">
    <div className="flex items-center">
      {icon}
      <Menu.Button
        className={classNames(
          options.length ? "hover:bg-black hover:text-white" : "",
          "inline-flex justify-center w-full rounded-md py-2 bg-white font-medium font-bold focus:outline-none"
        )}
      >
        {label}
        {options.length ? (
          <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
        ) : null}
      </Menu.Button>
    </div>

    {!!options.length && (
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-right absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {options.map((option) => {
              const {
                value,
                action,
                label: optionLabel,
                icon: optionIcon,
              } = option;
              return (
                <Menu.Item key={value}>
                  {({ active }) => (
                    <button
                      type="button"
                      onClick={action}
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm w-full flex items-center font-bold"
                      )}
                    >
                      {optionIcon}
                      <span>{optionLabel}</span>
                    </button>
                  )}
                </Menu.Item>
              );
            })}
          </div>
        </Menu.Items>
      </Transition>
    )}
  </Menu>
);
Dropdown.defaultProps = {
  icon: "",
};
Dropdown.propTypes = propTypes;
export default Dropdown;
