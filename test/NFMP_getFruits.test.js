const { expect } = require("chai");
const { ethers } = require("hardhat");
const errorMessages = require("./Errors");
("./Errors");
const emits = require("./Emits");
const strings = require("./Strings");


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
    await fruitContract.addFruit(strings.FRUIT_NAME, strings.DEFAULT_PRICE);
  });

  it("givenGetUserFruits_whenUserIsNotRegistered_shouldRevertWithError", async () => {
    await expect(
      fruitContract.connect(random).getUserFruits()
    ).to.be.revertedWith(errorMessages.ERROR_USER_NOT_REGISTERED);
  });

  it("givenGetUserFruits_whenUserHasNoFruits_shouldReturnEmptyArray", async () => {
    const userFruits = await fruitContract.connect(buyer).getUserFruits();
    expect(userFruits).to.be.an(strings.EMPTY_ARRAY).that.is.empty;
  });

  it("givenGetUserFruits_whenUserHasFruits_shouldReturnArrayOfIds", async () => {
    const userFruits = await fruitContract.getUserFruits();
    expect(userFruits).to.be.an(strings.EMPTY_ARRAY).that.is.not.empty;
    const fruit = userFruits.at(strings.ZERO_INDEX);
    expect(fruit).to.be.equal(strings.ZERO_INDEX);
  });

  it("givenGetUserFruit_whenUserNotRegistered_shouldRevertWithError", async () => {
    await expect(
      fruitContract.connect(random).getUserFruit(strings.ZERO_INDEX)
    ).to.be.revertedWith(errorMessages.ERROR_USER_NOT_REGISTERED);
  });

  it("givenGetUserFruit_whenFruitIdDoesNotExist_shouldRevertWithError", async () => {
    await expect(
      fruitContract.getUserFruit(strings.BIG_INDEX)
    ).to.be.revertedWith(errorMessages.ERROR_FRUIT_DOES_NOT_EXIST);
  });

  it("givenGetUserFruit_whenNotOwner_shouldRevertWithError", async () => {
    await expect(
      fruitContract.connect(buyer).getUserFruit(strings.ZERO_INDEX)
    ).to.be.revertedWith(errorMessages.ERROR_NOT_FRUIT_OWNER);
  });

  it("givenGetUserFruit_whenOwner_shouldReturnFruit", async () => {
    const fruit = await fruitContract.getUserFruit(strings.ZERO_INDEX);
    expect(fruit.id).to.be.equal(strings.ZERO_INDEX);
    expect(fruit.name).to.be.equal(strings.FRUIT_NAME);
    expect(fruit.owner).to.be.equal(await owner.getAddress());
    expect(fruit.price).to.be.equal(strings.DEFAULT_PRICE);
  });

  it("givenGetFruitsForSale_whenUserNotRegister_shouldRevertWithError", async () => {
    await expect(
      fruitContract.connect(random).getFruitsForSale()
    ).to.be.revertedWith(errorMessages.ERROR_USER_NOT_REGISTERED);
  });

  it("givenGetFruitsForSale_whenNoFruitsForSale_shouldReturnEmptyArray", async () => {
    const fruitsForSale = await fruitContract.getFruitsForSale();
    expect(fruitsForSale).to.be.an(strings.EMPTY_ARRAY).that.is.empty;
  });

  it("givenGetFruitsForSale_whenFruitsForSaleNotEmpty_shouldArrayOfFruitIds", async () => {
    await fruitContract.sellFruit(strings.ZERO_INDEX, strings.DEFAULT_PRICE);
    const fruitsForSale = await fruitContract.getFruitsForSale();
    expect(fruitsForSale).to.be.an(strings.EMPTY_ARRAY).that.is.not.empty;
    expect(fruitsForSale.at(strings.ZERO_INDEX)).to.equal(strings.ZERO_INDEX);
  });

  it("givenGetFruitForSale_whenNotRegistered_shouldRevertWithError", async () => {
    await expect(
      fruitContract.connect(random).getFruitForSale(strings.ZERO_INDEX)
    ).to.be.revertedWith(errorMessages.ERROR_USER_NOT_REGISTERED);
  });

  it("givenGetFruitForSale_whenFruitDoesNotExist_shouldRevertWithError", async () => {
    await expect(
      fruitContract.getFruitForSale(strings.BIG_INDEX)
    ).to.be.revertedWith(errorMessages.ERROR_FRUIT_DOES_NOT_EXIST);
  });

  it("givenGetFruitForSale_whenFruitIsNotForSale_shouldRevertWithError", async () => {
    await expect(
      fruitContract.getFruitForSale(strings.ZERO_INDEX)
    ).to.be.revertedWith(errorMessages.ERROR_FRUIT_NOT_FOR_SALE);
  });

  it("givenGetFruitForSale_whenValidIndex_shouldFruitForSale", async () => {
    await fruitContract.sellFruit(strings.ZERO_INDEX, strings.DEFAULT_PRICE);
    const fruit = await fruitContract.getFruitForSale(strings.ZERO_INDEX);
    expect(fruit.name).to.be.equal(strings.FRUIT_NAME);
    expect(fruit.id).to.be.equal(strings.ZERO_INDEX);
    expect(fruit.forSale).to.be.equal(true);
    expect(fruit.owner).to.be.equal(await owner.getAddress());
  });
});
