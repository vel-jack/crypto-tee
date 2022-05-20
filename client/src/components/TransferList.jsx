import React, { useContext, useEffect, useState } from "react";
import { contractAddress } from "../context/contract";
import { TeeContext } from "../context/TeeContext";
import { date, date2, shortAddress } from "../utils";

const TransferList = () => {
  const { transferList, currentAccount } = useContext(TeeContext);
  const [currentList, setCurrentList] = useState([]);
  const [currentCursor, setCurrentCursor] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const loadList = (cursor) => {
    const from = cursor * 10;
    const to = from + 10;
    setCurrentCursor(cursor);
    setCurrentList(transferList.slice(from, to));
  };

  useEffect(() => {
    if (transferList.length > 0) {
      loadList(0);
      setTotalPages(parseInt(transferList.length / 10) + 1);
    }
  }, [transferList]);

  const TransferRow = ({ props }) => {
    return (
      <tr>
        <td className="text-left px-6 py-1">
          {currentAccount &&
          currentAccount.toLowerCase() == props.from.toLowerCase()
            ? "You"
            : contractAddress.toLowerCase() == props.from.toLowerCase()
            ? "Crypto-T "
            : shortAddress(props.from)}
        </td>
        <td className="text-left px-6 py-1">
          {currentAccount &&
          currentAccount.toLowerCase() == props.to.toLowerCase()
            ? "You"
            : shortAddress(props.to)}
        </td>
        {/* <td className="text-left px-6 py-1 hidden sm:block">{props.time}</td> */}
        <td className="text-left px-6 py-1 hidden lg:block">
          {date(props.time)}
        </td>
        <td className="text-left px-6 py-1 hidden lg:hidden md:block ">
          {date2(props.time)}
        </td>
        <td className="text-left px-6 py-1">#{props.id}</td>
        <td className="text-left px-6 py-1">{props.amount}</td>
      </tr>
    );
  };
  return (
    <div>
      {transferList.length > 0 && (
        <>
          <div className="text-xl p-5 font-semibold sm:text-2xl sm:text-center">
            Transactions
          </div>
          <div className="">
            <div className="flex justify-center flex-col sm:flex-row overflow-x-auto">
              <div className="w-10"></div>
              <table>
                <thead>
                  <tr>
                    <th className="text-left px-6 py-2">FROM</th>
                    <th className="text-left px-6 py-2">TO</th>
                    <th className="text-left px-6 py-2 hidden lg:block">
                      TIME
                    </th>
                    <th className="text-left px-6 py-2 hidden md:block lg:hidden">
                      TIME
                    </th>
                    <th className="text-left px-6 py-2">ID</th>
                    <th className="text-left px-6 py-2">ETH</th>
                  </tr>
                </thead>
                <tbody>
                  {currentList.map((item, index) => (
                    <TransferRow props={item} key={index} />
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex px-6 sm:justify-center">
              <button
                disabled={currentCursor == 0}
                className={`px-3  rounded text-white font-bold bg-black ${
                  currentCursor == 0 && "cursor-not-allowed"
                }`}
                onClick={(e) => loadList(currentCursor - 1)}
              >
                {"<"}
              </button>
              <div className="py-1 px-5">
                Page {currentCursor + 1} of {totalPages}
              </div>
              <button
                disabled={currentCursor == totalPages - 1}
                className={`px-3  rounded text-white font-bold bg-black 
                ${currentCursor == totalPages - 1 && "cursor-not-allowed"}
                `}
                onClick={(e) => loadList(currentCursor + 1)}
              >
                {">"}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TransferList;
