const { ethers } = require("hardhat");
const { expect } = require("chai");

describe("TeePurchase.sol", () => {
  let contractFactory;
  let contract;
  let tobbey, tom, andrew;

  before(async () => {
    contractFactory = await ethers.getContractFactory("TeePurchase");
    contract = await contractFactory.deploy();
    [tobbey, tom, andrew] = await ethers.getSigners();
    contract.deployed();
  });
  it("Should return 0 tee", async () => {
    const totalTees = await contract.totalTeeDesigned();
    expect(totalTees).to.equal(0);
  });
  it("should return 1 and name should be Jack", async () => {
    await contract.purchaseTee("Jack", {
      value: ethers.utils.parseEther("0.0002"),
    });
    const totalTees = await contract.totalTeeDesigned();
    expect(totalTees).to.equal(1);
    const tee = await contract.tees(0);
    expect(tee.name).to.equal("Jack");
  });
  it("Should mint/purchase tee from tom account", async () => {
    expect(await contract.howManyOwns(tom.address)).to.equal(0);
    await contract.connect(tom).purchaseTee("Tom", {
      value: ethers.utils.parseEther("0.0002"),
    });
    expect(await contract.howManyOwns(tom.address)).to.equal(1);
  });
  it("Should mint/purchase 2 tees from andrew account", async () => {
    expect(await contract.howManyOwns(andrew.address)).to.equal(0);
    await contract.connect(andrew).purchaseTee("Gwen", {
      value: ethers.utils.parseEther("0.0002"),
    });
    await contract.connect(andrew).purchaseTee("Ben", {
      value: ethers.utils.parseEther("0.0002"),
    });
    expect(await contract.howManyOwns(tom.address)).to.equal(2);
  });

  it("Should return 4 tees", async () => {
    const totalTees = await contract.totalTeeDesigned();
    expect(totalTees).to.equal(4);
  });
});
