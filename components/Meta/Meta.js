import Head from "next/head";
import PropTypes from "prop-types";

const propTypes = {
  title: PropTypes.string,
  keywords: PropTypes.string,
  description: PropTypes.string.isRequired,
};

const Meta = ({ title, keywords, description }) => {
  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="keywords" content={keywords} />
      <meta name="description" content={description} />
      <meta charSet="utf-8" />
      <link rel="icon" href="/favicon.ico" />
      <title>{title}</title>
    </Head>
  );
};

Meta.defaultProps = {
  title: "Metaverse Marketplace",
  keywords: "NFT, crypto, blockchain",
  description: "Get the latest news NFTs",
};

Meta.propTypes = propTypes;
export default Meta;
