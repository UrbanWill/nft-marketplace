import "../styles/globals.css";
import Layout from "../components/Layout/Layout";

function NFTMarketPlace({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default NFTMarketPlace;
