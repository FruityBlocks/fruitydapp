const { expect } = require("chai");
const { ethers } = require("hardhat");

const FRUIT_NAME = "BANANA";
const DEFAULT_PRICE = ethers.parseEther("1");

describe("NewFruitMarketPlace", () => {
  let fruitContract;
  let owner, buyer;

  beforeEach(async () => {
    [owner, buyer] = await ethers.getSigners();
    const FruitMarket = await ethers.getContractFactory("NewFruitMarketPlace");
    fruitContract = await FruitMarket.deploy();
    await fruitContract.waitForDeployment();
    await fruitContract.connect(owner).createUser();
    await fruitContract.connect(buyer).createUser();
  });

  it("givenNewFruitMarketPlace_whenInstanceStart_shouldDeployContract", async () => {
    expect(await fruitContract.getAddress()).to.not.equal(ethers.ZeroAddress);
  });

  it("givenCreateUserRequest_whenUserIsNotRegistered_shouldRegisterUser", async () => {
    expect(await fruitContract.isRegistered()).to.equal(true);
  });

  it("givenAddFruitRequest_whenFruitDoesNotExist_shouldAddFruit", async () => {
    await fruitContract.addFruit(FRUIT_NAME, DEFAULT_PRICE);
    const addedFruit = await fruitContract.fruits(0);
    expect(addedFruit.name).to.equal(FRUIT_NAME);
    expect(addedFruit.price).to.equal(DEFAULT_PRICE);
    expect(addedFruit.forSale).to.equal(false);
    expect(addedFruit.owner).to.equal(await owner.getAddress());
  });
});
