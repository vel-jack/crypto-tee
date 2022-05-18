import React from "react";
import MintTee from "./components/Mint";
import Navbar from "./components/Navbar";
import TransferList from "./components/TransferList";
import OwnedCollection from "./components/OwnedCollection";
import Footer from "./components/Footer";

const App = () => {
  return (
    <div className="min-h-screen font-mono">
      <Navbar />
      <MintTee />
      <OwnedCollection />
      <TransferList />
      <Footer />
    </div>
  );
};

export default App;
