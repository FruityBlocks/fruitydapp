const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("NewFruitMarketPlace", () => {
  let fruitContract;
  let owner, buyer;

  beforeEach(async () => {
    [owner, buyer] = await ethers.getSigners();
    const FruitMarket = await ethers.getContractFactory("NewFruitMarketPlace");
    fruitContract = await FruitMarket.deploy();
    await fruitContract.waitForDeployment();
  });

  it("givenNewFruitMarketPlace_whenInstanceStart_shouldDeployContract", async () => {
    expect(await fruitContract.getAddress()).to.not.equal(ethers.ZeroAddress);
  });

  it("givenCreateUserRequest_whenUserIsNotRegistered_shouldRegisterUser", async () => {
    await fruitContract.createUser();
    expect(await fruitContract.isRegistered()).to.equal(true);
  });
});
