import React, { useEffect, useRef, useState, Fragment } from "react";
import { createPortal } from "react-dom";
import { Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";

import PropTypes from "prop-types";

const propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onHandleModalClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

const Modal = ({ children, isOpen, onHandleModalClose, title }) => {
  const [modalRoot, setModalRoot] = useState(null);
  const elRef = useRef(document.createElement("div"));

  /**
   * Provides a first-class way to render children into a DOM node that exists
   *  outside the DOM hierarchy of the parent component. Eg:
   *  Render modal from SlideOverPanel
   */
  useEffect(() => {
    setModalRoot(document.getElementById("modal"));
  }, [setModalRoot]);

  useEffect(() => {
    const divEl = elRef.current;

    if (!modalRoot) {
      return null;
    }

    modalRoot.appendChild(elRef.current);
    return () => {
      modalRoot.removeChild(divEl);
    };
  }, [modalRoot]);

  return createPortal(
    <Transition.Root show={isOpen} as={Fragment}>
      <div className="modal fixed z-50 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-75">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          enterTo="opacity-100 translate-y-0 sm:scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 translate-y-0 sm:scale-100"
          leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        >
          <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="mt-3 text-center sm:mt-0 sm:text-left lg:my-2">
                <h3 className="text-lg leading-6 font-bold text-gray-900 text-xl">
                  {title}
                </h3>
                <button
                  type="button"
                  className="absolute right-4 top-4 pointer"
                >
                  <XIcon
                    className="block h-6 w-6"
                    aria-hidden="true"
                    onClick={onHandleModalClose}
                  />
                </button>
                <div className="mt-2">{children}</div>
              </div>
            </div>
          </div>
        </Transition.Child>
      </div>
    </Transition.Root>,
    elRef.current
  );
};

Modal.propTypes = propTypes;
export default Modal;
