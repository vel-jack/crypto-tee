import React, { useEffect, useState } from "react";
import { contractAbi, contractAddress } from "./contract";
import { ethers } from "ethers";

const { ethereum } = window;

export const TeeContext = React.createContext();

export const TeeContextProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [collection, setCollection] = useState([]);
  const getContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractAbi, signer);
    return contract;
  };
  const [totalTees, setTotalTees] = useState(0);
  const [currentTee, setCurrentTee] = useState(null);
  const [currentTeeOwner, setCurrentTeeOwner] = useState("");
  const checkIsWalletConnected = async () => {
    try {
      if (!ethereum) return alert("Please install Metamask");
      const accounts = await ethereum.request({ method: "eth_accounts" });
      if (accounts.length) {
        setCurrentAccount(accounts[0]);
        console.log(accounts);
      } else {
        console.log("No accounts connected");
      }
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object detected");
    }
  };

  const connectWallet = async () => {
    try {
      if (!ethereum) return alert("Please install Metamask");
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const mintNewTee = async (teeName) => {
    if (!teeName || teeName.length > 6) return alert("Choose valid nickname");

    try {
      if (!ethereum) return alert("Please install Metamask");

      const contract = getContract();
      const txn = await contract.purchaseTee(teeName, {
        value: ethers.utils.parseEther("0.0002"),
      });
      console.log("Trying to mint...");
      await txn.wait();
      console.log("Done ", txn.hash);
      await getTeeCollections();
    } catch (error) {
      console.log(error);
    }
  };

  const getTeeCollections = async () => {
    console.log("getTeeCollection called");
    try {
      if (!ethereum) return alert("Please install Metamask");
      const contract = getContract();
      const rawTeeCollection = await contract.getMyTees();
      const total = await contract.totalTeeDesigned();
      setTotalTees(parseInt(total));
      const teeCollection = rawTeeCollection.map((item) => ({
        nickname: item.name,
        id: parseInt(item.id),
        design: item.design.toString(),
        amount: ethers.utils.formatEther(item.amount),
      }));

      if (teeCollection.length) {
        setCurrentTee(teeCollection[0]);
        setCurrentTeeOwner(currentAccount);
      }
      setCollection(teeCollection);
    } catch (error) {
      console.log(error);
    }
  };

  const searchTee = async (searchId) => {
    const teeID = parseInt(searchId);
    if (teeID == isNaN) return alert("Invalid id");
    if (teeID < 0 || teeID >= totalTees) return alert("Invalid id");
    try {
      if (!ethereum) return alert("Please install Metamask");
      const contract = getContract();
      const item = await contract.tees(teeID);
      const teeOwner = await contract.teeOwner(teeID);
      const tee = {
        nickname: item.name,
        id: parseInt(item.id),
        design: item.design.toString(),
        amount: ethers.utils.formatEther(item.amount),
      };
      if (parseInt(item.design) == 0) return;
      setCurrentTee(tee);
      setCurrentTeeOwner(teeOwner);
    } catch (error) {
      console.log(error);
    }
  };

  const updateNewPrice = async (id, newPrice) => {
    if (currentTee.id != id) return;
    try {
      if (!ethereum) return alert("Please install Metamask");
      const contract = getContract();
      const txn = await contract.changePrice(
        id,
        ethers.utils.parseEther(newPrice)
      );
      console.log("Trying to change");
      await txn.wait();
      console.log("Price changed ", txn.hash);
      await searchTee(id);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkIsWalletConnected();
  }, []);
  useEffect(() => {
    if (currentAccount) {
      getTeeCollections();
    }
  }, [currentAccount]);
  return (
    <TeeContext.Provider
      value={{
        connectWallet,
        currentAccount,
        mintNewTee,
        collection,
        currentTee,
        setCurrentTee,
        currentTeeOwner,
        searchTee,
        setCurrentTeeOwner,
        totalTees,
        updateNewPrice,
      }}
    >
      {children}
    </TeeContext.Provider>
  );
};
