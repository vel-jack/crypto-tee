const Navbar = () => {
  return (
    <div className="h-20 w-full flex justify-around items-center">
      <div className="p-2 font-bold text-4xl">Crypto-T</div>
      <div>
        <button className="text-xl font-bold bg-black text-white px-2 py-1 rounded">
          Connect
        </button>
      </div>
    </div>
  );
};
export default Navbar;
