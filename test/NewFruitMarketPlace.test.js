const { expect } = require("chai");
const { ethers } = require("hardhat");
const errorMessages = require("./Errors");
("./Errors");
const emits = require("./Emits");
const strings = require("./Strings");

const FRUIT_NAME = "BANANA";
const DEFAULT_PRICE = ethers.parseEther("1");
const ZERO_INDEX = 0;

describe("NewFruitMarketPlace", () => {
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

  it("givenNewFruitMarketPlace_whenInstanceStart_shouldDeployContract", async () => {
    expect(await fruitContract.getAddress()).to.not.equal(ethers.ZeroAddress);
  });

  it("givenCreateUserRequest_whenUserIsNotRegistered_shouldRegisterUser", async () => {
    expect(await fruitContract.isRegistered()).to.equal(true);
  });

  it("givenAddFruitRequest_whenFruitDoesNotExist_shouldAddFruit", async () => {
    await fruitContract.addFruit(FRUIT_NAME, DEFAULT_PRICE);
    const addedFruit = await fruitContract.fruits(ZERO_INDEX);
    expect(addedFruit.name).to.equal(FRUIT_NAME);
    expect(addedFruit.price).to.equal(DEFAULT_PRICE);
    expect(addedFruit.forSale).to.equal(false);
    expect(addedFruit.owner).to.equal(await owner.getAddress());
  });

  it("givenAddFruitRequest_whenFruitExists_shouldRevertWithError", async () => {
    await fruitContract.addFruit(FRUIT_NAME, DEFAULT_PRICE);
    await expect(
      fruitContract.addFruit(FRUIT_NAME, DEFAULT_PRICE)
    ).to.be.revertedWith(errorMessages.ERROR_FRUIT_ALREADY_EXISTS);
  });

  it("givenAddFruitRequest_whenUserNotRegistered_shouldRevertWithError", async () => {
    await expect(
      fruitContract.connect(random).addFruit(FRUIT_NAME, DEFAULT_PRICE)
    ).to.be.revertedWith(errorMessages.ERROR_USER_NOT_REGISTERED);
  });

  it("givenSellFruitRequest_whenFruitDoesNotExist_shouldRevertWithError", async () => {
    await expect(
      fruitContract.sellFruit(ZERO_INDEX, DEFAULT_PRICE)
    ).to.be.revertedWith(errorMessages.ERROR_FRUIT_DOES_NOT_EXIST);
  });

  it("givenSellFruitRequest_whenNotOwner_shouldRevertWithError", async () => {
    await fruitContract.addFruit(FRUIT_NAME, DEFAULT_PRICE);
    await expect(
      fruitContract.connect(buyer).sellFruit(ZERO_INDEX, DEFAULT_PRICE)
    ).to.be.revertedWith(errorMessages.ERROR_NOT_FRUIT_OWNER);
  });

  it("givenSellFruitRequest_whenOwnerAndFruitExists_shouldModifyFruitForSale", async () => {
    await fruitContract.addFruit(FRUIT_NAME, DEFAULT_PRICE);
    await expect(fruitContract.sellFruit(ZERO_INDEX, DEFAULT_PRICE)).to.emit(
      fruitContract,
      emits.FRUIT_FOR_SALE
    );
    const addedFruit = await fruitContract.fruits(ZERO_INDEX);
    expect(addedFruit.forSale).to.equal(true);
  });

  it("givenSellFruitRequest_whenOwnerAndFruitExists_shouldModifyFruitForSale", async () => {});
});
