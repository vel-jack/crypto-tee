const OwnedCollection = () => {
  let isTeeOwner = true;
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
          <canvas
            name="myCanvas"
            height="400"
            width="400"
            className="bg-black"
          />
          <div className="absolute bottom-1 left-2 text-white">
            Owned by <span className="font-bold">You</span>
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
              <button className="bg-black text-white font-bold py-2 w-[100px] rounded sm:w-full ">
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
