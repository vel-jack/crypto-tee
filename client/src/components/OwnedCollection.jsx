const OwnedCollection = () => {
  const TeeChip = ({ id, name }) => {
    return (
      <button className="bg-black rounded-full text-white px-3 py-1 flex gap-1">
        <span className="font-bold">#{id}</span>
        {name}
      </button>
    );
  };
  return (
    <div className="flex flex-col sm:items-center gap-2 px-5">
      <div className="text-xl font-semibold sm:text-2xl">Your collections</div>
      <div className="flex flex-wrap gap-x-1 gap-y-2">
        {["Jack", "Tom", "Rose", "OK", "Sometimes", "yes"].map(
          (item, index) => (
            <TeeChip name={item} id={index} />
          )
        )}
      </div>
    </div>
  );
};

export default OwnedCollection;
