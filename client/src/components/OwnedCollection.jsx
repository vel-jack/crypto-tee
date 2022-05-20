import React, { useState, useContext, useRef, useEffect } from "react";
import teeFront from "../assets/tee.png";
import teeStyle from "../assets/tee2.png";
import { TeeContext } from "../context/TeeContext";
import { shortAddress } from "../utils";

const OwnedCollection = () => {
  const {
    collection,
    currentAccount,
    currentTee,
    setCurrentTee,
    currentTeeOwner,
    setCurrentTeeOwner,
    searchTee,
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
  } = useContext(TeeContext);

  const canvasRef = useRef(null);
  const [searchId, setSearchId] = useState("");
  const [isTeeOwner, setIsTeeOwner] = useState(false);
  const [newPrice, setNewPrice] = useState("");
  const [transferAddress, setTransferAddress] = useState("");
  const [approveTo, setApproveTo] = useState("");
  let image1 = new Image();
  let image2 = new Image();
  image1.src = teeStyle;
  image2.src = teeFront;
  const getColor = (s) => {
    const r = (parseInt(s[0]) / 9) * 255;
    const g = (parseInt(s[1]) / 9) * 255;
    const b = (parseInt(s[2]) / 9) * 255;
    return `rgb(${r}, ${g}, ${b})`;
  };
  const placeHolderTee = () => {
    image2.onload = () => {
      makeTee("0000000000", "[ ]");
    };
  };
  const makeTee = (s, name) => {
    if (!canvasRef) return;
    const ctx = canvasRef.current.getContext("2d");
    if (currentAccount && currentTeeOwner) {
      if (currentAccount.toLowerCase() == currentTeeOwner.toLowerCase()) {
        setIsTeeOwner(true);
      } else {
        setIsTeeOwner(false);
      }
    } else {
      setIsTeeOwner(false);
    }
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
    ctx.fillText(name, 200, 180);
    ctx.lineWidth = 1;
    ctx.strokeText(name, 200, 180);
    ctx.font = "bold 39px Mono ";
    ctx.fillStyle = "black";
    ctx.strokeText(name, 200, 180);
    ctx.fillText(name, 200, 180);
  };

  const TeeChip = ({ tee, isCurrent }) => {
    return (
      <button
        onClick={(e) => {
          try {
            setCurrentTee(tee);
            setCurrentTeeOwner(currentAccount);
          } catch (error) {
            console.log(error);
          }
        }}
        className={` ${
          isCurrent
            ? "bg-white text-black border border-black font-bold"
            : "bg-black text-white"
        } rounded-full  px-3 py-1 flex gap-1`}
      >
        <span className="font-bold">#{tee.id}</span>
        {tee.nickname}
      </button>
    );
  };

  const handleNewPrice = () => {
    if (!newPrice) return alert("Please give valid amount");
    if (newPrice <= currentTee.amount)
      return alert(`Please give more than ${currentTee.amount}`);
    updateNewPrice(currentTee.id, newPrice);
    setNewPrice("");
  };
  useEffect(() => {
    placeHolderTee();
  }, []);

  useEffect(() => {
    if (currentTee) {
      makeTee(currentTee.design, currentTee.nickname);
    }
    setApproveTo("");
    setPendingApproval("");
    setIsTeeApproved(false);
  }, [currentTee]);

  return (
    <div>
      <div className="flex flex-col sm:items-center gap-2 px-5">
        <div className="text-xl font-semibold sm:text-2xl">
          {currentAccount ? "Your collections" : "Please connect wallet"}
        </div>
        <div className="flex flex-wrap gap-x-1 gap-y-2 xl:w-[60%]">
          {collection.map((item, index) => (
            <TeeChip
              key={index}
              tee={item}
              isCurrent={item.id == currentTee.id ? true : false}
              // isCurrent={false}
              design={item.design}
            />
          ))}
        </div>
      </div>
      <div className="flex flex-col items-center sm:flex-row sm:justify-center py-5 flex-wrap sm:gap-10">
        <div className="relative">
          <canvas ref={canvasRef} height="400" width="400" />
          <div className="absolute bottom-1 left-2 ">
            Owned by{" "}
            <span className="font-bold">
              {currentAccount
                ? isTeeOwner
                  ? "You"
                  : shortAddress(currentTeeOwner)
                : ":)"}
            </span>
          </div>
          {currentTee && (
            <div className="absolute bottom-1 right-2 ">
              <span className="font-bold text-lg">{currentTee.amount} ETH</span>
            </div>
          )}
          {currentTee && (
            <div className="absolute top-1 right-2 ">
              <span className="font-bold text-2xl">#{currentTee.id}</span>
            </div>
          )}
        </div>
        <div>
          <div className="flex flex-col gap-3 py-2 sm:w-96">
            <div className="flex justify-between sm:flex-col gap-2">
              <input
                type="number"
                step="1"
                value={searchId}
                max={totalTees - 1}
                min={0}
                onChange={(e) => setSearchId(e.target.value)}
                placeholder="Search with #id"
                className="py-1 px-2 sm:w-full sm:text-center rounded border border-black w-72"
              />
              <button
                className="bg-black text-white font-bold py-2 w-[100px] rounded sm:w-full"
                onClick={() => searchTee(searchId)}
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
                    min={0}
                    value={newPrice}
                    onChange={(e) => {
                      setNewPrice(e.target.value);
                    }}
                    placeholder="New price in ETH"
                    className="py-1 px-2 sm:w-full sm:text-center rounded border border-black w-72"
                  />
                  <button
                    onClick={(e) => {
                      handleNewPrice();
                    }}
                    className="bg-black text-white font-bold py-2 w-[100px] rounded sm:w-full "
                  >
                    Change
                  </button>
                </div>

                <div className="flex justify-between sm:flex-col gap-2">
                  <input
                    type="text"
                    value={transferAddress}
                    onChange={(e) => setTransferAddress(e.target.value)}
                    placeholder="Wallet address"
                    className="py-1 px-2 sm:w-full sm:text-center rounded border border-black w-72"
                  />
                  <button
                    onClick={(e) => {
                      transferTee(transferAddress, currentTee.id);
                      setTransferAddress("");
                    }}
                    className="bg-black text-white font-bold py-2 w-[100px] rounded sm:w-full "
                  >
                    Transfer
                  </button>
                </div>

                <div className="flex justify-between sm:flex-col gap-2">
                  <input
                    type="text"
                    placeholder="Wallet address"
                    value={approveTo}
                    onChange={(e) => {
                      setApproveTo(e.target.value);
                    }}
                    className="py-1 px-2 sm:w-full sm:text-center rounded border border-black w-72"
                  />
                  <button
                    onClick={(e) => {
                      approveToAddress(approveTo, currentTee.id);
                    }}
                    className="bg-black text-white font-bold py-2 w-[100px] rounded sm:w-full "
                  >
                    Approve
                  </button>
                </div>
                {pendingApproval && (
                  <div>
                    {"Pending Approval : "}
                    <button
                      className="font-bold"
                      onClick={(e) => setApproveTo(pendingApproval)}
                    >
                      {shortAddress(pendingApproval).toUpperCase()}
                    </button>
                  </div>
                )}
              </>
            )}
            {!isTeeOwner && (
              <>
                {pendingApproval ? (
                  <button className="bg-black text-white font-bold py-2 rounded w-full cursor-text">
                    {pendingApproval.toLowerCase() ==
                    currentAccount.toLowerCase()
                      ? "Already you asked 👍"
                      : `Asked by ${shortAddress(pendingApproval)}`}
                  </button>
                ) : (
                  <button
                    className="bg-black text-white font-bold py-2 rounded w-full"
                    onClick={(e) => requestApproval()}
                  >
                    Request for approval
                  </button>
                )}
                {pendingApproval &&
                  pendingApproval.toLowerCase() !=
                    currentAccount.toLowerCase() && (
                    <button
                      onClick={(e) => changeApproval()}
                      className="bg-black text-white font-bold py-2 rounded w-full "
                    >
                      Approve me (0.0001 ETH) 💸
                    </button>
                  )}
                {isTeeApproved ? (
                  <button
                    onClick={(e) => {
                      buyFromOwner(currentTeeOwner, currentTee.id);
                    }}
                    className="bg-black text-white font-bold py-2 rounded w-full"
                  >
                    Buy from Owner 💸
                  </button>
                ) : (
                  <button
                    onClick={(e) => alert("You are not approved by tee owner")}
                    className="bg-black hover:cursor-not-allowed text-white font-bold py-2 rounded w-full line-through"
                  >
                    Buy from Owner
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnedCollection;
