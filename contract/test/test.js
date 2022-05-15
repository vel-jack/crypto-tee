const { ethers } = require("hardhat");
const { expect } = require("chai");

describe("TeePurchase.sol", () => {
  let contractFactory;
  let contract;

  before(async () => {
    contractFactory = await ethers.getContractFactory("TeePurchase");
    contract = await contractFactory.deploy();
    contract.deployed();
  });
  it("Should return 0 tee", async () => {
    const totalTees = await contract.totalTeeDesigned();
    expect(totalTees).to.equal(0);
  });
});
