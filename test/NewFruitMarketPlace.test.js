const { expect } = require("chai");
const { ethers } = require("hardhat");

const FRUIT_NAME = "BANANA";
const DEFAULT_PRICE = ethers.parseEther("1");


describe("NewFruitMarketPlace", () => {
  let fruitContract;
  let owner, buyer, random;

  beforeEach(async () => {
    [owner, buyer, random] = await ethers.getSigners();
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

  it("givenAddFruitRequest_whenFruitExists_shouldRevertWithError", async () => {
    await fruitContract.addFruit(FRUIT_NAME, DEFAULT_PRICE);
    await expect(
      fruitContract.addFruit(FRUIT_NAME, DEFAULT_PRICE)
    ).to.be.revertedWith("Fruit already exists.");
  });

  it("givenAddFruitRequest_whenUserNotRegistered_shouldRevertWithError", async () => {
    await expect(
      fruitContract.connect(random).addFruit(FRUIT_NAME, DEFAULT_PRICE)
    ).to.be.revertedWith(
      "User is not registered, you are not allowed to do this action."
    );
  });

  it("givenSellFruitRequest_whenFruitDoesNotExist_shouldRevertWithError", async () => {
    await expect(fruitContract.sellFruit(0, DEFAULT_PRICE)).to.be.revertedWith(
      "The fruit does not exist"
    );
  });

  it("givenSellFruitRequest_whenNotOwner_shouldRevertWithError", async () => {
    await fruitContract.addFruit(FRUIT_NAME, DEFAULT_PRICE);
    await expect(
      fruitContract.connect(buyer).sellFruit(0, DEFAULT_PRICE)
    ).to.be.revertedWith("You are not the owner of this fruit");
  });

  it("givenSellFruitRequest_whenOwnerAndFruitExists_shouldModifyFruitForSale", async () => {
    await fruitContract.addFruit(FRUIT_NAME, DEFAULT_PRICE);
    await expect(fruitContract.sellFruit(0, DEFAULT_PRICE)).to.emit(
      fruitContract,
      "FruitForSale"
    );
    const addedFruit = await fruitContract.fruits(0);
    expect(addedFruit.forSale).to.equal(true);
  });
});
