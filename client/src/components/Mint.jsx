import React from "react";

export default function MintTee() {
  return (
    <div className="p-6 flex flex-col justify-center items-center gap-2">
      <div className="">
        <div className="text-xl sm:text-2xl lg:text-3xl">
          Mint your unique T-Shirt and say
        </div>
        <div className="font-bold italic text-2xl sm:text-3xl md:text-4xl">
          "I own unique tee(s) in this crypto world"
        </div>
      </div>
      <div className=" w-full flex flex-col justify-center sm:items-center gap-2 py-3 sm:p-6">
        <div className="text-sm text-gray-500 italic sm:text-lg">
          Choose your perfect nickname
        </div>
        {/* Todo: Need to set max length only 5 */}
        <div className="flex gap-2 flex-col sm:flex-row">
          <input
            type="text"
            placeholder="Nickname"
            className="p-1 border border-black rounded w-full sm:w-64 text-center"
          />
          <div className="flex gap-2 flex-col sm:flex-row">
            <div>
              <button className="px-4 py-2 bg-black text-white rounded font-bold w-full">
                Mint Now
              </button>
            </div>
            <div className="py-1 text-sm italic">
              <span className="font-bold">0.0002</span> ETH/Mint
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
