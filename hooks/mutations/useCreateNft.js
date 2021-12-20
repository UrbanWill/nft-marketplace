import useEthers from "../contexts/useEthers";

/**
 * hook to buy nft
 * @returns {{createNftMutation: function}}
 */
const useCreateNft = () => {
  const { signedTokenContract } = useEthers();

  /** function to create nft
   * @param {url} nft url to be minted
   * @returns {Promise<{ object {success: bool, tokenId: int} | {success: bool, error: object}}> }
   */
  const createNftMutation = async (url) => {
    // TODO: Throw success/fail toasts
    const transaction = await signedTokenContract
      .createToken(url)
      .then(async (res) => {
        const tokenId = await res
          .wait()
          .then((tx) => tx.events[0].args[2].toNumber());
        return { success: true, tokenId };
      })
      .catch((err) => {
        if (err.code === 4001) {
          console.log("User cancelled transaction");
        }
        return { success: false, ...err };
      });
    return transaction;
  };

  return { createNftMutation };
};

export default useCreateNft;
