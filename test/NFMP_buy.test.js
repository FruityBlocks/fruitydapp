const { expect } = require("chai");
const { ethers } = require("hardhat");
const errorMessages = require("./Errors");
("./Errors");
const emits = require("./Emits");
const strings = require("./Strings");

describe("NewFruitMarketPlaceBuyFruits", () => {
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
    await fruitContract.addFruit(
      strings.FRUIT_NAME_OTHER,
      strings.DEFAULT_PRICE
    );
    await fruitContract.sellFruit(strings.ZERO_INDEX, strings.DEFAULT_PRICE);
  });

  it("givenBuyFruit_whenUserNotRegistered_shouldRevertWithError", async () => {
    await expect(
      fruitContract.connect(random).buyFruit(strings.ZERO_INDEX)
    ).to.revertedWith(errorMessages.ERROR_USER_NOT_REGISTERED);
  });

  it("givenBuyFruit_whenFruitDoesNotExist_shouldRevertWithError", async () => {
    await expect(fruitContract.buyFruit(strings.BIG_INDEX)).to.revertedWith(
      errorMessages.ERROR_FRUIT_DOES_NOT_EXIST
    );
  });

  it("givenBuyFruit_whenFruitNotForSale_shouldRevertWithError", async () => {
    await expect(fruitContract.buyFruit(strings.ONE_INDEX)).to.revertedWith(
      errorMessages.ERROR_FRUIT_NOT_FOR_SALE
    );
  });

  it("givenBuyFruit_whenSellerIsBuyer_shouldRevertWithError", async () => {
    await expect(fruitContract.buyFruit(strings.ZERO_INDEX)).to.revertedWith(
      errorMessages.ERROR_CANNOT_BUY_ALREADY_OWNED_FRUIT
    );
  });

  it("givenBuyFruit_whenInsufficientFund_shouldRevertWithError", async () => {
    await expect(
      fruitContract.connect(buyer).buyFruit(strings.ZERO_INDEX, {
        value: strings.INSUFFICIENT_PRICE,
      })
    ).to.be.revertedWith(errorMessages.ERROR_INSUFFICIENT_FUNDS);
  });

  it("givenBuyFruit_whenSufficientFunds_shouldCorrectlyMakeTransfer", async () => {
    await fruitContract.connect(buyer).buyFruit(strings.ZERO_INDEX, {
      value: strings.DEFAULT_PRICE,
    });
    const buyerFruits = await fruitContract.connect(buyer).getUserFruits();
    const sellerFruits = await fruitContract.getUserFruits();
    expect(buyerFruits).to.be.an(strings.EMPTY_ARRAY).that.is.not.empty;
    const buyerFruit = await fruitContract
      .connect(buyer)
      .getUserFruit(strings.ZERO_INDEX);
    expect(buyerFruit.owner).to.be.equal(await buyer.getAddress());
    expect(buyerFruit.name).to.be.equal(strings.FRUIT_NAME);
    expect(sellerFruits).to.be.an(strings.EMPTY_ARRAY).to.have.lengthOf(1);
    const sellerFruit = await fruitContract.getUserFruit(strings.ONE_INDEX);
    expect(sellerFruit.owner).to.be.equal(await owner.getAddress());
    expect(sellerFruit.name).to.be.equal(strings.FRUIT_NAME_OTHER);
  });
});
