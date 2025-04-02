const { expect } = require("chai");
const { ethers } = require("hardhat");
const errorMessages = require("./Errors");
("./Errors");
const emits = require("./Emits");
const strings = require("./Strings");

const FRUIT_NAME = "BANANA";
const DEFAULT_PRICE = ethers.parseEther("1");
const ZERO_INDEX = 0;
const BIG_INDEX = 1000;
const ARRAY_STRING = "array";

describe("NewFruitMarketPlaceGetFruits", () => {
  let fruitContract;
  let owner, buyer, random;

  beforeEach(async () => {
    [owner, buyer, random] = await ethers.getSigners();
    const FruitMarket = await ethers.getContractFactory(strings.CONTRACT_NAME);
    fruitContract = await FruitMarket.deploy();
    await fruitContract.waitForDeployment();
    await fruitContract.connect(owner).createUser();
    await fruitContract.connect(buyer).createUser();
    await fruitContract.addFruit(FRUIT_NAME, DEFAULT_PRICE);
  });

  it("givenGetUserFruits_whenUserIsNotRegistered_shouldRevertWithError", async () => {
    await expect(
      fruitContract.connect(random).getUserFruits()
    ).to.be.revertedWith(errorMessages.ERROR_USER_NOT_REGISTERED);
  });

  it("givenGetUserFruits_whenUserHasNoFruits_shouldReturnEmptyArray", async () => {
    const userFruits = await fruitContract.connect(buyer).getUserFruits();
    expect(userFruits).to.be.an(ARRAY_STRING).that.is.empty;
  });

  it("givenGetUserFruits_whenUserHasFruits_shouldReturnArrayOfIds", async () => {
    const userFruits = await fruitContract.getUserFruits();
    expect(userFruits).to.be.an(ARRAY_STRING).that.is.not.empty;
    const fruit = userFruits.at(0);
    expect(fruit).to.be.equal(0);
  });

  it("givenGetUserFruit_whenUserNotRegistered_shouldRevertWithError", async () => {
    await expect(
      fruitContract.connect(random).getUserFruit(ZERO_INDEX)
    ).to.be.revertedWith(errorMessages.ERROR_USER_NOT_REGISTERED);
  });

  it("givenGetUserFruit_whenFruitIdDoesNotExist_shouldRevertWithError", async () => {
    await expect(fruitContract.getUserFruit(BIG_INDEX)).to.be.revertedWith(
      errorMessages.ERROR_FRUIT_DOES_NOT_EXIST
    );
  });

  it("givenGetUserFruit_whenNotOwner_shouldRevertWithError", async () => {
    await expect(
      fruitContract.connect(buyer).getUserFruit(ZERO_INDEX)
    ).to.be.revertedWith(errorMessages.ERROR_NOT_FRUIT_OWNER);
  });
});
