import "../styles/globals.css";
import Layout from "../components/Layout/Layout";

function NFTMarketPlace({ Component, pageProps }) {
  return (
    <div>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </div>
  );
}

export default NFTMarketPlace;
