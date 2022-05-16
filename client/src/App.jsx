import MintTee from "./components/Mint";
import Navbar from "./components/Navbar";
import OwnedCollection from "./components/OwnedCollection";

const App = () => {
  return (
    <div className="min-h-screen font-mono">
      <Navbar />
      <MintTee />
      <OwnedCollection />
    </div>
  );
};

export default App;
