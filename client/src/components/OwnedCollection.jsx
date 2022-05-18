import React, { useState, useEffect, useRef } from "react";
import teeFront from "../assets/tee.png";
import teeStyle from "../assets/tee2.png";

const OwnedCollection = () => {
  const canvasRef = useRef(null);
  let isTeeOwner = true;
  let image1 = new Image();
  image1.src = teeStyle;
  let image2 = new Image();
  image2.src = teeFront;
  const getColor = (s) => {
    const r = (parseInt(s[0]) / 9) * 255;
    const g = (parseInt(s[1]) / 9) * 255;
    const b = (parseInt(s[2]) / 9) * 255;
    return `rgb(${r}, ${g}, ${b})`;
  };
  const makeTee = (s) => {
    if (!canvasRef) return;
    const ctx = canvasRef.current.getContext("2d");
    // ctx.fillStyle = "white";
    // ctx.fillRect(0, 0, 400, 400);
    ctx.clearRect(0, 0, 400, 400);
    ctx.fillStyle = getColor(s.substring(0, 3));
    ctx.fillRect(0, 0, 133.3, 400);
    ctx.fillStyle = getColor(s.substring(3, 6));
    ctx.fillRect(133, 0, 266.6, 400);
    ctx.fillStyle = getColor(s.substring(6, 9));
    ctx.fillRect(266.6, 0, 400, 400);
    ctx.save();
    ctx.translate(200, 200);
    const deg = (parseInt(s[9]) / 9) * 100;
    ctx.rotate((deg * Math.PI) / 70);
    ctx.translate(-200, -200);
    ctx.drawImage(image1, 0, 0);
    ctx.restore();
    ctx.drawImage(image2, 0, 0);
    ctx.textAlign = "center";
    ctx.font = "bold 35px Mono ";
    ctx.fillStyle = "white";
    ctx.strokeStyle = "white";
    ctx.fillText("Jack", 200, 180);
    ctx.lineWidth = 1;
    ctx.strokeText("Jack", 200, 180);
    ctx.font = "bold 39px Mono ";
    ctx.fillStyle = "black";
    ctx.strokeText("Jack", 200, 180);
    ctx.fillText("Jack", 200, 180);
  };

  const TeeChip = ({ id, name, isCurrent }) => {
    return (
      <button
        className={` ${
          isCurrent
            ? "bg-white text-black border border-black font-bold"
            : "bg-black text-white"
        } rounded-full  px-3 py-1 flex gap-1`}
      >
        <span className="font-bold">#{id}</span>
        {name}
      </button>
    );
  };
  return (
    <div>
      <div className="flex flex-col sm:items-center gap-2 px-5">
        <div className="text-xl font-semibold sm:text-2xl">
          Your collections
        </div>
        <div className="flex flex-wrap gap-x-1 gap-y-2 xl:w-[60%]">
          {[
            "Jack",
            "Tom",
            "Rose",
            "OK",
            "Sometimes",
            "yes",
            "Jack",
            "Tom",
            "Rose",
            "OK",
            "Sometimes",
            "yes",
            "Jack",
            "Tom",
            "Rose",
            "OK",
            "Sometimes",
            "yes",
            "Jack",
            "Tom",
            "Rose",
            "OK",
            "Sometimes",
            "yes",
          ].map((item, index) => (
            <TeeChip
              key={index}
              name={item}
              id={index}
              isCurrent={index == 4 ? true : false}
            />
          ))}
        </div>
      </div>
      <div className="flex flex-col items-center sm:flex-row sm:justify-center py-5 flex-wrap sm:gap-10">
        <div className="relative">
          <canvas ref={canvasRef} height="400" width="400" />
          <div className="absolute bottom-1 left-2 ">
            Owned by <span className="font-bold">You</span>
          </div>
          <div className="absolute bottom-1 right-2 ">
            <span className="font-bold text-lg">#10</span>
          </div>
        </div>
        <div>
          <div className="flex flex-col gap-3 py-2 sm:w-96">
            <div className="flex justify-between sm:flex-col gap-2">
              <input
                type="number"
                step="1"
                placeholder="Search with #id"
                className="py-1 px-2 sm:w-full sm:text-center rounded border border-black w-72"
              />
              <button
                className="bg-black text-white font-bold py-2 w-[100px] rounded sm:w-full"
                onClick={() => makeTee("4106660200")}
              >
                Search
              </button>
            </div>

            {isTeeOwner && (
              <>
                <div className="flex justify-between sm:flex-col gap-2">
                  <input
                    type="number"
                    step="0.0001"
                    placeholder="New price in ETH"
                    className="py-1 px-2 sm:w-full sm:text-center rounded border border-black w-72"
                  />
                  <button className="bg-black text-white font-bold py-2 w-[100px] rounded sm:w-full ">
                    Change
                  </button>
                </div>

                <div className="flex justify-between sm:flex-col gap-2">
                  <input
                    type="text"
                    placeholder="Wallet address"
                    className="py-1 px-2 sm:w-full sm:text-center rounded border border-black w-72"
                  />
                  <button className="bg-black text-white font-bold py-2 w-[100px] rounded sm:w-full ">
                    Transfer
                  </button>
                </div>

                <div className="flex justify-between sm:flex-col gap-2">
                  <input
                    type="text"
                    placeholder="Wallet address"
                    className="py-1 px-2 sm:w-full sm:text-center rounded border border-black w-72"
                  />
                  <button className="bg-black text-white font-bold py-2 w-[100px] rounded sm:w-full ">
                    Approve
                  </button>
                </div>
              </>
            )}
            {!isTeeOwner && (
              <>
                <button className="bg-black text-white font-bold py-2 rounded w-full ">
                  Request for approval
                </button>
                <button className="bg-black text-white font-bold py-2 rounded w-full ">
                  Approve me (0.0001 ETH)
                </button>
                <button className="bg-black text-white font-bold py-2 rounded w-full ">
                  Buy from Owner
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnedCollection;
