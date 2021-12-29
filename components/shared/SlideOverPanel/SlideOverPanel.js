import { useEffect, Fragment, useRef, useCallback, useState } from "react";
import PropTypes from "prop-types";
import { Transition } from "@headlessui/react";

const propTypes = {
  isOpen: PropTypes.bool.isRequired,
  shouldStayOpen: PropTypes.bool.isRequired,
  onSetIsOpen: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

const SlideOverPanel = ({ isOpen, onSetIsOpen, children, shouldStayOpen }) => {
  const [modalRoot, setModalRoot] = useState(null);
  const slideOverRef = useRef(null);

  useEffect(() => {
    setModalRoot(document.getElementById("modal"));
  }, [setModalRoot]);

  /* Closes SlideOverPanel if click event is outside a slideOverRef child or pressing 'esc' key,
  do not close if click event is inside modalRoot or child components */
  const handleClose = useCallback(
    (event) => {
      if (
        (!slideOverRef.current?.contains(event.target) &&
          !modalRoot.contains(event.target) &&
          !event.keyCode) ||
        event.keyCode === 27
      ) {
        onSetIsOpen(false);
      }
    },
    [onSetIsOpen, modalRoot]
  );

  useEffect(() => {
    if (isOpen && !shouldStayOpen) {
      /* Prevent scrolling on mount and adds background style 
      if shouldStayOpen is true do not add event listeners again
      */
      document.body.style.overflow = "hidden";
      document.getElementById("layout-body").style.filter =
        "blur(5px) grayscale(50%)";
    }
    /* Scrolls to the top of the page on mount */
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    /* Re-enable scrolling when component unmounts and removes background style */
    return () => {
      document.body.style.overflow = "visible";
      document.getElementById("layout-body").style.filter = "";
    };
  }, [
    isOpen,
    shouldStayOpen,
  ]); /* Only runs when isOpen or shouldStayOpen changes */

  /* Adds/removes event listeners for click and key press events,
  if shouldStayOpen is true do not add event listeners
  */
  useEffect(() => {
    if (slideOverRef.current && isOpen && !shouldStayOpen) {
      document.addEventListener("click", handleClose);
      document.addEventListener("keydown", handleClose);
    }
    return () => {
      document.removeEventListener("click", handleClose);
      document.removeEventListener("keydown", handleClose);
    };
  }, [
    isOpen,
    handleClose,
    shouldStayOpen,
  ]); /* Only runs when isOpen or shouldStayOpen changes */

  return (
    <div ref={slideOverRef}>
      <Transition.Root show={isOpen} as={Fragment}>
        <div className="absolute top-0 right-0 h-content z-10">
          <Transition.Child
            as={Fragment}
            enter="transform transition ease-in-out duration-300 sm:duration-500"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transform transition ease-in-out duration-300 sm:duration-500"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <div className="relative w-screen h-full lg:max-w-md bg-white shadow-2xl">
              {children}
            </div>
          </Transition.Child>
        </div>
      </Transition.Root>
    </div>
  );
};

SlideOverPanel.prototypes = propTypes;
export default SlideOverPanel;
