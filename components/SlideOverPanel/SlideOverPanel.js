import { useEffect, Fragment, useRef, useCallback } from "react";
import PropTypes from "prop-types";
import { Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";

const propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onSetIsOpen: PropTypes.func.isRequired,
};

const SlideOverPanel = ({ isOpen, onSetIsOpen }) => {
  const slideOverRef = useRef(null);

  /* Closes SlideOverPanel if click event is outside a slideOverRef child or pressing 'esc' key */
  const handleClose = useCallback(
    (event) => {
      if (
        (!slideOverRef.current?.contains(event.target) && !event.keyCode) ||
        event.keyCode === 27
      ) {
        onSetIsOpen(false);
      }
    },
    [onSetIsOpen]
  );

  useEffect(() => {
    if (isOpen) {
      /* Prevent scrolling on mount and adds background style */
      document.body.style.overflow = "hidden";
      document.getElementById("layout-body").style.filter =
        "blur(5px) grayscale(50%)";
    }
    /* Re-enable scrolling when component unmounts and removes background style */
    return () => {
      document.body.style.overflow = "visible";
      document.getElementById("layout-body").style.filter = "";
    };
  }, [isOpen]); /* Only runs when isOpen changes */

  /* Adds/removes event listeners for click and key press events */
  useEffect(() => {
    if (slideOverRef.current && isOpen) {
      document.addEventListener("click", handleClose);
      document.addEventListener("keydown", handleClose);
    }
    return () => {
      document.removeEventListener("click", handleClose);
      document.removeEventListener("keydown", handleClose);
    };
  }, [isOpen, handleClose]); /* Only runs when isOpen changes */

  return (
    <div ref={slideOverRef}>
      <Transition.Root show={isOpen} as={Fragment}>
        <div className="absolute top-0 right-0 h-screen z-50">
          <Transition.Child
            as={Fragment}
            enter="transform transition ease-in-out duration-300 sm:duration-500"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transform transition ease-in-out duration-300 sm:duration-500"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <div className="relative w-screen h-full lg:max-w-md">
              <button
                type="button"
                className="rounded-md text-gray-300 hover:text-black focus:outline-none focus:ring-2 focus:ring-white px-2 pt-2"
                onClick={() => onSetIsOpen(false)}
              >
                <span className="sr-only">Close panel</span>
                <XIcon className="h-6 w-6" aria-hidden="true" />
              </button>
              <div className="h-full flex flex-col bg-white h-full shadow-xl">
                <div className="px-4 sm:px-6">
                  <p>Panel Title</p>
                </div>
                <div className="mt-6 relative flex-1 px-4 sm:px-6">
                  <div className="absolute inset-0 px-4 sm:px-6">
                    <div
                      className="h-full border-2 border-dashed border-gray-200"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Transition.Root>
    </div>
  );
};

SlideOverPanel.prototypes = propTypes;
export default SlideOverPanel;
