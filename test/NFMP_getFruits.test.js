const { expect } = require("chai");
const { ethers } = require("hardhat");

const FRUIT_NAME = "BANANA";
const DEFAULT_PRICE = ethers.parseEther("1");
const ZERO_INDEX = 0;

describe("NewFruitMarketPlaceGetFruits", () => {
  let fruitContract;
  let owner, buyer, random;

  beforeEach(async () => {
    [owner, buyer, random] = await ethers.getSigners();
    const FruitMarket = await ethers.getContractFactory("NewFruitMarketPlace");
    fruitContract = await FruitMarket.deploy();
    await fruitContract.waitForDeployment();
    await fruitContract.connect(owner).createUser();
    await fruitContract.connect(buyer).createUser();
    await fruitContract.addFruit(FRUIT_NAME, DEFAULT_PRICE);
  });

  it("givenGetUserFruits_whenUserIsNotRegistered_shouldRevertWithError", async () => {
    await expect(
      fruitContract.connect(random).getUserFruits()
    ).to.be.revertedWith(
      "User is not registered, you are not allowed to do this action."
    );
  });

  it("givenGetUserFruits_whenUserHasNoFruits_shouldReturnEmptyArray", async () => {
    const userFruits = await fruitContract.connect(buyer).getUserFruits();
    expect(userFruits).to.be.an("array").that.is.empty;
  });

  it("givenGetUserFruits_whenUserHasFruits_shouldReturnArrayOfIds", async () => {
    const userFruits = await fruitContract.getUserFruits();
    expect(userFruits).to.be.an("array").that.is.not.empty;
    const fruit = userFruits.at(0);
    expect(fruit).to.be.equal(0);
  });
});
