import { createContext, useContext, useState } from "react";

const ToggleWalletPanelContext = createContext();

/**
 * Context provider to toggle wallet panel
 * @returns {isWalletPanelOpen: bool, setIsWalletPanelOpen: func}
 *  */
export const ToggleWalletPanelProvider = ({ children }) => {
  const [isWalletPanelOpen, setIsWalletPanelOpen] = useState(false);
  const values = { isWalletPanelOpen, setIsWalletPanelOpen };
  return (
    <ToggleWalletPanelContext.Provider value={values}>
      {children}
    </ToggleWalletPanelContext.Provider>
  );
};

/**  Export context to be able to use them in child components */
export default () => useContext(ToggleWalletPanelContext);
