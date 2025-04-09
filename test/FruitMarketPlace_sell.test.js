const { expect } = require("chai");
const { ethers } = require("hardhat");
const errorMessages = require("./const/Errors");
const emits = require("./const/Emits");
const strings = require("./const/Strings");

describe("FruitMarketPlaceSell", () => {
  let fruitContract;
  let owner, buyer, random;

  beforeEach(async () => {
    [owner, buyer, random] = await ethers.getSigners();
    const FruitMarket = await ethers.getContractFactory(strings.CONTRACT_NAME);
    fruitContract = await FruitMarket.deploy();
    await fruitContract.waitForDeployment();
    await fruitContract.connect(owner).createUser();
    await fruitContract.connect(buyer).createUser();
  });

  it("givenSellFruitRequest_whenFruitDoesNotExist_shouldRevertWithError", async () => {
    await expect(
      fruitContract.sellFruit(strings.ZERO_INDEX, strings.DEFAULT_PRICE)
    ).to.be.revertedWith(errorMessages.ERROR_FRUIT_DOES_NOT_EXIST);
  });

  it("givenSellFruitRequest_whenNotOwner_shouldRevertWithError", async () => {
    await fruitContract.addFruit(strings.FRUIT_NAME, strings.DEFAULT_PRICE);
    await expect(
      fruitContract
        .connect(buyer)
        .sellFruit(strings.ZERO_INDEX, strings.DEFAULT_PRICE)
    ).to.be.revertedWith(errorMessages.ERROR_NOT_FRUIT_OWNER);
  });

  it("givenSellFruitRequest_whenOwnerAndFruitExists_shouldModifyFruitForSale", async () => {
    await fruitContract.addFruit(strings.FRUIT_NAME, strings.DEFAULT_PRICE);
    await expect(
      fruitContract.sellFruit(strings.ZERO_INDEX, strings.DEFAULT_PRICE)
    ).to.emit(fruitContract, emits.FRUIT_FOR_SALE);
    const fruit = await fruitContract.getUserFruit(strings.ZERO_INDEX);
    expect(fruit.forSale).to.be.equal(true);
  });
});