import React from "react";
const Navbar = () => {
  return (
    <div className="h-16 w-full flex justify-around items-center sticky top-0 bg-white z-10">
      <div className="p-2 font-bold text-4xl">Crypto-T</div>
      <div>
        <button className="text-xl font-bold bg-black text-white px-3 py-2 rounded">
          Connect
        </button>
      </div>
    </div>
  );
};
export default Navbar;
