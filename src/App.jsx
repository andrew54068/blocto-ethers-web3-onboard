import { useRef } from "react";
import { ethers } from "ethers";
import { useConnectWallet } from "@web3-onboard/react";
import SendTransaction from "./component/SendTransaction";
import SignMessage from "./component/SignMessage";
import "./App.css";

export default function App() {
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();
  // create an ethers provider
  const ethersProviderRef = useRef();
  if (wallet && !ethersProviderRef.current) {
    // ether v5
    const provider = new ethers.providers.Web3Provider(wallet.provider);
    ethersProviderRef.current = provider;
    console.log(provider);
  }

  const addChain = async () => {
    // this is not working
    await ethersProviderRef.current?.send("wallet_addEthereumChain", [
      {
        chainId: "0x8274f", // 534351(0x8274f)
        chainName: "Scroll Sepolia Testnet", // The name of the target network
        rpcUrls: ["https://scroll-sepolia.blockpi.network/v1/rpc/public"], // The RPC URL of the target network
      },
    ]);
  };

  const switchChain = async () => {
    await ethersProviderRef.current?.send("wallet_switchEthereumChain", [
      {
        chainId: "0x8274f" // 534351(0x8274f)
      },
    ]);
    console.log(`switched to scroll.`)
  };

  return (
    <div className="main-wrap">
      <button
        disabled={connecting}
        onClick={() => (wallet ? disconnect(wallet) : connect())}
      >
        <span>
          {connecting ? "Connecting" : wallet ? "Disconnect" : "Connect"}
        </span>
      </button>
      {wallet && (
        <>
          <button onClick={addChain}>
            <span>Add Chain</span>
          </button>
          <button onClick={switchChain}>
            <span>Switch</span>
          </button>
        </>
      )}
      <div className="login-wrap">
        {wallet && (
          <>
            <SendTransaction provider={ethersProviderRef.current} />
            <SignMessage provider={ethersProviderRef.current} />
          </>
        )}
      </div>
    </div>
  );
}
