import "../styles/globals.css";
import { Web3ReactProvider } from "@web3-react/core";
import { ethers } from "ethers";
import Layout from "../components/Layout/Layout";

const getLibrary = (provider) => new ethers.providers.Web3Provider(provider);

function NFTMarketPlace({ Component, pageProps }) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Web3ReactProvider>
  );
}

export default NFTMarketPlace;
