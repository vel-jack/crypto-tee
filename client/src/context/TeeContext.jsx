import React, { useEffect, useState } from "react";
import { contractAbi, contractAddress } from "./contract";
import { ethers } from "ethers";
import { addressZero } from "../utils";

const { ethereum } = window;

export const TeeContext = React.createContext();

export const TeeContextProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [collection, setCollection] = useState([]);
  const [totalTees, setTotalTees] = useState(0);
  const [currentTee, setCurrentTee] = useState(null);
  const [currentTeeOwner, setCurrentTeeOwner] = useState("");
  const [pendingApproval, setPendingApproval] = useState("");
  const [isTeeApproved, setIsTeeApproved] = useState(false);
  const [transferList, setTransferList] = useState([]);
  const getContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractAbi, signer);
    return contract;
  };

  const checkIsWalletConnected = async () => {
    try {
      if (!ethereum) return alert("Please install Metamask");
      const accounts = await ethereum.request({ method: "eth_accounts" });
      if (accounts.length) {
        setCurrentAccount(accounts[0]);
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
    if (!currentAccount) return alert("Please connect wallet");
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
    if (!currentAccount) return alert("Please connect wallet");
    const teeID = parseInt(searchId);
    if (isNaN(teeID)) return alert("Invalid id");
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
    if (!currentAccount) return alert("Please connect wallet");
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

  const transferTee = async (to, id) => {
    if (!currentAccount) return alert("Please connect wallet");
    if (
      currentAccount.toLocaleLowerCase() != currentTeeOwner.toLocaleLowerCase()
    )
      return;

    try {
      if (!ethereum) return alert("Please install Metamask");
      const contract = getContract();
      const txn = await contract.transferTo(to, id);
      console.log("Trying to transfer");
      await txn.wait();
      console.log("Transfered", txn.hash);
      await getTeeCollections();
    } catch (error) {
      console.log(error);
    }
  };

  const requestApproval = async () => {
    if (!currentAccount) return alert("Please connect wallet");
    if (
      currentAccount.toLocaleLowerCase() == currentTeeOwner.toLocaleLowerCase()
    )
      return;
    try {
      if (!ethereum) return alert("Please install Metamask");
      const contract = getContract();
      const txn = await contract.askForApproval(currentTee.id);
      console.log("Trying to ask..");
      await txn.wait();
      console.log("Successfully asked", txn.hash);
      await checkPendingApproval();
    } catch (error) {
      console.log(error);
    }
  };

  const changeApproval = async () => {
    if (!currentAccount) return alert("Please connect wallet");
    if (
      currentAccount.toLocaleLowerCase() == currentTeeOwner.toLocaleLowerCase()
    )
      return;
    try {
      if (!ethereum) return alert("Please install Metamask");
      const contract = getContract();
      const txn = await contract.changeApprovalRequestToMe(currentTee.id, {
        value: ethers.utils.parseEther("0.0001"),
      });
      console.log("Trying to change approval request..");
      await txn.wait();
      console.log("Successfully changed", txn.hash);
      await checkPendingApproval();
    } catch (error) {
      console.log(error);
    }
  };

  const checkPendingApproval = async () => {
    if (!currentAccount || !currentTee) return alert("Please connect wallet");
    try {
      if (!ethereum) return alert("Please install Metamask");
      const contract = getContract();
      const pendingAddress = await contract.pendingApproval(currentTee.id);
      if (pendingAddress != addressZero) {
        setPendingApproval(pendingAddress);
        if (
          pendingAddress.toLocaleLowerCase() ==
          currentAccount.toLocaleLowerCase()
        ) {
          checkApproved();
        }
      } else {
        setPendingApproval("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const approveToAddress = async (to, id) => {
    if (!currentAccount) return alert("Please connect wallet");
    if (
      currentAccount.toLocaleLowerCase() != currentTeeOwner.toLocaleLowerCase()
    )
      return alert("You are not the owner");
    if (!ethers.utils.isAddress(to))
      return alert("Please provide valid address");
    try {
      if (!ethereum) return alert("Please install Metamask");
      const contract = getContract();
      const txn = await contract.approveTo(to, parseInt(id));
      console.log("Trying to approve..");
      await txn.wait();
      console.log("Successfully approved", txn.hash);
    } catch (error) {
      console.log(error);
    }
  };

  const checkApproved = async () => {
    if (!currentAccount || !currentTee) return alert("Please connect wallet");
    try {
      if (!ethereum) return alert("Please install Metamask");
      const contract = getContract();
      const approvedAddress = await contract.approved(currentTee.id);
      setIsTeeApproved(
        currentAccount.toLowerCase() == approvedAddress.toLowerCase()
          ? true
          : false
      );
    } catch (error) {
      console.log(error);
    }
  };

  const buyFromOwner = async (teeOwner, id) => {
    if (!currentAccount) return alert("Please connect wallet");
    if (!currentTee || currentTee.id != id) return;
    if (!ethers.utils.isAddress(teeOwner)) return;
    try {
      if (!ethereum) return alert("Please install Metamask");
      const contract = getContract();
      const txn = await contract.buyFromOwner(teeOwner, id, {
        value: ethers.utils.parseEther(currentTee.amount),
      });
      console.log("Trying to buy..");
      await txn.wait();
      console.log("Transcation succes", txn.hash);
      await getTeeCollections();
    } catch (error) {
      console.log(error);
    }
  };

  const getAllTransfers = async () => {
    if (!currentAccount) return alert("Please connect wallet");
    try {
      if (!ethereum) return alert("Please install Metamask");
      const contract = getContract();
      const transfers = await contract.getAllTransfers();
      let transferArray = transfers.map((item) => ({
        from: item.from,
        to: item.to,
        time: parseInt(item.time),
        id: parseInt(item.teeIndex),
        amount: ethers.utils.formatEther(item.amount),
      }));
      transferArray.reverse();
      setTransferList(transferArray);
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
      if (!transferList.length) {
        getAllTransfers();
      }
    }
  }, [currentAccount]);

  useEffect(() => {
    if (currentAccount && currentTee) {
      checkPendingApproval();
    }
  }, [currentTee]);

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
        transferTee,
        requestApproval,
        pendingApproval,
        setPendingApproval,
        approveToAddress,
        isTeeApproved,
        setIsTeeApproved,
        buyFromOwner,
        changeApproval,
        transferList,
      }}
    >
      {children}
    </TeeContext.Provider>
  );
};
