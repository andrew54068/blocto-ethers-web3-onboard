import injectedModule from "@web3-onboard/injected-wallets";
import { init } from "@web3-onboard/react";
import bloctoModule from "@web3-onboard/blocto";

const polygonTestnet = {
  id: "0x13881",
  token: "MATIC",
  label: "Polygon",
  rpcUrl: "https://rpc-mumbai.maticvigil.com",
};

const scrollTestnet = {
  id: "0x8274f", // 534351(0x8274f)
  token: "ETH",
  label: "Scroll Sepolia Testnet",
  rpcUrl: "https://scroll-sepolia.blockpi.network/v1/rpc/public",
};

const chains = [polygonTestnet, scrollTestnet];
const blocto = bloctoModule();
const wallets = [injectedModule(), blocto];

const web3Onboard = init({
  wallets,
  chains,
  appMetadata: {
    name: "Web3-Onboard Demo",
    icon: "<svg>My App Icon</svg>",
    description: "A demo of Web3-Onboard.",
  },
});

export { web3Onboard };
