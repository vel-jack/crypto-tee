import React from "react";

export default function MintTee() {
  return (
    <div className="flex flex-col-2 p-2 justify-center">
      <div className="p-2 flex flex-col justify-center items-center gap-3">
        {/*  Todo: Need to work on canvas */}
        <div className="border-2 h-48 w-48 sm:h-96 sm:w-96 flex items-center justify-center">
          Tee Place Holder
        </div>
        <div className="text-sm sm:text-xl">
          Total T-shirt minted : <span className="font-bold font-mono">0</span>
        </div>
      </div>
      <div className="p-2  flex justify-center items-center sm:w-96">
        <div className="flex flex-col gap-4">
          <div className="text-lg md:text-3xl sm:text-xl">
            Mint your unique T-Shirt and say
            <span className="font-bold inline-block text-transparent bg-clip-text bg-gradient-to-tr from-black ">
              "I own unique tee(s) in this crypto world"
            </span>
          </div>
          <div>
            <div className="text-sm text-gray-500 italic">
              Choose your perfect nickname
            </div>
            {/* Todo: Need to set max length only 5 */}
            <input type="text" placeholder="Nickname" className="p-1 border" />
          </div>
          <div className="sm:flex sm:flex-col-2 sm:gap-2">
            <div>
              <button className="px-2 py-1 bg-black text-white rounded font-bold w-full sm:w-40">
                Mint Now
              </button>
            </div>
            <div className="py-1 text-sm italic">
              <span className="font-mono">0.0002</span> ETH/Mint
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
