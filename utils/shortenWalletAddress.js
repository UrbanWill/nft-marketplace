const shortenWalletAddress = (account) =>
  `${account.substring(0, 6)}...${account.substring(account.length - 4)}`;

export default shortenWalletAddress;
