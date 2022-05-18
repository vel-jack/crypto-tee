const { ethers } = require("hardhat");
const { expect } = require("chai");

describe("TeePurchase.sol", () => {
  let contractFactory;
  let contract;
  let owner, tom, andrew;

  before(async () => {
    contractFactory = await ethers.getContractFactory("TeePurchase");
    contract = await contractFactory.deploy();
    [owner, tom, andrew] = await ethers.getSigners();
    contract.deployed();
  });

  it("Should return 0 tee", async () => {
    const totalTees = await contract.totalTeeDesigned();
    expect(totalTees).to.equal(0);
  });

  it("should return Jack and design with length 9", async () => {
    await contract.purchaseTee("Jack", {
      value: ethers.utils.parseEther("0.0002"),
    });
    const totalTees = await contract.totalTeeDesigned();
    const tee = await contract.tees(0);
    expect(tee.name).to.equal("Jack");
    expect(tee.design.toString().length).to.equal(10);
  });

  it("Should mint/purchase tee from tom account", async () => {
    expect(await contract.howManyOwns(tom.address)).to.equal(0);
    await contract
      .connect(tom)
      .purchaseTee("Tom", { value: ethers.utils.parseEther("0.0002") });
    expect(await contract.howManyOwns(tom.address)).to.equal(1);
    expect(await contract.teeOwner(1)).to.equal(tom.address);
  });

  it("Should mint/purchase 2 tees from andrew account", async () => {
    expect(await contract.howManyOwns(andrew.address)).to.equal(0);
    await contract.connect(andrew).purchaseTee("Gwen", {
      value: ethers.utils.parseEther("0.0002"),
    });
    await contract.connect(andrew).purchaseTee("Ben", {
      value: ethers.utils.parseEther("0.0002"),
    });
    expect(await contract.howManyOwns(andrew.address)).to.equal(2);
  });

  it("Should return 4 tees", async () => {
    const totalTees = await contract.totalTeeDesigned();
    expect(totalTees).to.equal(4);
  });

  it("Should return 2 tees of Andrew", async () => {
    const tees = await contract.connect(andrew).getMyTees();
    expect(tees.length).to.equal(2);
    expect(tees[0].name).to.equal("Gwen");
    expect(tees[1].name).to.equal("Ben");
  });

  it("Should withdraw from contract only by owner", async () => {
    await contract.withdraw();
    // await contract.connect(tom).withdraw(); // throw error
    expect(await ethers.provider.getBalance(contract.address)).to.equal(0);
  });

  it("Should change tee sale price", async () => {
    await contract
      .connect(tom)
      .purchaseTee("Holland", { value: ethers.utils.parseEther("0.0002") });
    const teeIndex = (await contract.totalTeeDesigned()) - 1;
    let tee = await contract.tees(teeIndex);
    expect(tee.amount.toNumber()).to.equal(ethers.utils.parseEther("0.0002"));
    // await contract.changePrice(teeIndex, ethers.utils.parseEther("0.0004")); // permission error
    await contract
      .connect(tom)
      .changePrice(teeIndex, ethers.utils.parseEther("0.0004"));
    tee = await contract.tees(teeIndex);
    expect(tee.amount.toNumber()).to.equal(ethers.utils.parseEther("0.0004"));
  });
});
