import React, { useContext } from "react";
import { TeeContext } from "../context/TeeContext";
const Navbar = () => {
  const { connectWallet, currentAccount } = useContext(TeeContext);

  return (
    <div className="h-16 w-full flex justify-around items-center sticky top-0 bg-white z-10">
      <div className="p-2 font-bold text-4xl">Crypto-T</div>
      <div className="w-10">
        <button
          className={`text-xl font-bold bg-black text-white px-3 py-2 rounded ${
            currentAccount && "hidden"
          }`}
          onClick={connectWallet}
        >
          Connect
        </button>
      </div>
    </div>
  );
};
export default Navbar;
