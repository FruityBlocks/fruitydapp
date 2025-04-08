const { expect } = require("chai");
const { ethers } = require("hardhat");
const errorMessages = require("./Errors");
const emits = require("./Emits");

("./Errors");
const strings = require("./Strings");

describe("NewFruitMarketPlaceEditFruits", () => {
  let fruitContract;
  let owner, buyer, random;

  beforeEach(async () => {
    [owner, buyer, random] = await ethers.getSigners();
    const FruitMarket = await ethers.getContractFactory(strings.CONTRACT_NAME);
    fruitContract = await FruitMarket.deploy();
    await fruitContract.waitForDeployment();
    await fruitContract.connect(owner).createUser();
    await fruitContract.connect(buyer).createUser();
    await fruitContract.addFruit(strings.FRUIT_NAME, strings.DEFAULT_PRICE);
    await fruitContract.sellFruit(strings.ZERO_INDEX, strings.DEFAULT_PRICE);
  });

  it("givenEditFruit_whenUserNotRegistered_shouldRevertWithError", async () => {
    await expect(
      fruitContract.connect(random).editFruit(strings.ZERO_INDEX, strings.FRUIT_NAME_OTHER, strings.DEFAULT_PRICE)
    ).to.revertedWith(errorMessages.ERROR_USER_NOT_REGISTERED);
  });

  it("givenEditFruit_whenFruitDoesNotExist_shouldRevertWithError", async () => {
    await expect(fruitContract.editFruit(strings.BIG_INDEX, strings.FRUIT_NAME_OTHER, strings.DEFAULT_PRICE)).to.revertedWith(
      errorMessages.ERROR_FRUIT_DOES_NOT_EXIST
    );
  });

  it("givenEditFruit_whenSellerIsNotEditer_shouldRevertWithError", async () => {
    await expect(fruitContract.connect(buyer).editFruit(strings.ZERO_INDEX, strings.FRUIT_NAME_OTHER, strings.DEFAULT_PRICE)).to.revertedWith(
      errorMessages.ERROR_NOT_FRUIT_OWNER
    );
  });

  it("givenEditFruit_whenFruitNotForSale_shouldRevertWithError", async () => {
    await fruitContract.addFruit(strings.FRUIT_NAME_OTHER, strings.DEFAULT_PRICE);
    await expect(fruitContract.editFruit(strings.ONE_INDEX, strings.FRUIT_NAME_OTHER, strings.DEFAULT_PRICE)).to.revertedWith(
      errorMessages.ERROR_FRUIT_NOT_FOR_SALE
    );
  });

  it("givenEditFruit_whenFruitValid_shouldCorrectlyUpdateFruit", async () => {
    await expect(fruitContract.editFruit(strings.ZERO_INDEX, strings.FRUIT_NAME_OTHER, strings.OTHER_PRICE)).to.emit(fruitContract, emits.FRUIT_EDITED);
    const fruit = await fruitContract.getFruitForSale(strings.ZERO_INDEX);
    expect(fruit.name).equal(strings.FRUIT_NAME_OTHER);
    expect(fruit.price).equal(strings.OTHER_PRICE);
  });
});