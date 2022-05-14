const hre = require("hardhat");

const main = async () => {
  const TeePurchase = await hre.ethers.getContractFactory("TeePurchase");
  const teePurchase = await TeePurchase.deploy();
  await teePurchase.deployed();
  console.log("Contract deployed address, ", teePurchase.address);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
};

runMain();
