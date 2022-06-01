import React, { useContext } from "react";
import MintTee from "./components/Mint";
import Navbar from "./components/Navbar";
import TransferList from "./components/TransferList";
import OwnedCollection from "./components/OwnedCollection";
import Footer from "./components/Footer";
import Loading from "./components/Loading";
import { TeeContext } from "./context/TeeContext";

const App = () => {
  const {loading} = useContext(TeeContext);
  return (
    <div className="min-h-screen font-mono">
      <Navbar />
      <MintTee />
      <OwnedCollection />
      <TransferList />
      <Footer />
      {loading&&<Loading/>}
    </div>
  );
};

export default App;
