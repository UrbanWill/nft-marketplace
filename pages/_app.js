import "../styles/globals.css";
import { Web3ReactProvider } from "@web3-react/core";
import { ethers } from "ethers";
import Layout from "../components/Layout/Layout";
import { EthersProvider } from "../hooks/contexts/useEthers";
import { ToggleWalletPanelProvider } from "../hooks/contexts/useToggleWalletPanel";

const getLibrary = (provider) => new ethers.providers.Web3Provider(provider);

function NFTMarketPlace({ Component, pageProps }) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <EthersProvider>
        <ToggleWalletPanelProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ToggleWalletPanelProvider>
      </EthersProvider>
    </Web3ReactProvider>
  );
}

export default NFTMarketPlace;
