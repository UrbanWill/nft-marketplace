## Project description
A fully responsive NFT Marketplace where users can mint, sell, delist, buy and re-sell NFTs.

Deployed to Mumbai testnet: https://nft-marketplace-dusky.vercel.app/

## Setup

Download [Metamask extension](https://metamask.io/), add the Mumbai testnet network and switch to it.

- Network name: Mumbai
- New RPC URL: https://matic-mumbai.chainstacklabs.com
- Chain ID: 80001
- Currency Symbol: Matic

![Screen Shot 2022-01-24 at 18 48 08](https://user-images.githubusercontent.com/47801291/150760175-ae85c919-0671-4002-a1c8-7d339e6ebaf6.png)

Request test Matic at the [Poligon faucet](https://faucet.polygon.technology/) by selecting Mumbai network and pasting your wallet address.



## How to run locally:

- Colne the repo and install dependencies:
`npm install`
- Spin up a local network: 
`npx hardhat node`
- Deploy the contracts to the local network: `npx hardhat run scripts/deploy.js --network localhost`
- Start the app: `npm run dev`
