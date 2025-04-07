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
    await fruitContract.addFruit(
      strings.FRUIT_NAME_OTHER,
      strings.DEFAULT_PRICE
    );
    await fruitContract.sellFruit(strings.ZERO_INDEX, strings.DEFAULT_PRICE);
    await fruitContract.sellFruit(strings.ONE_INDEX, strings.DEFAULT_PRICE);
    await fruitContract.connect(buyer).buyFruit(strings.ZERO_INDEX, {
      value: strings.DEFAULT_PRICE,
    });
  });

  it("givenRateRequest_whenUserNotRegistered_shouldRevertWithError", async () => {
    await expect(
      fruitContract
        .connect(random)
        .rate(strings.RATING_COMMENT, strings.RATING, strings.ZERO_INDEX)
    ).to.revertedWith(errorMessages.ERROR_USER_NOT_REGISTERED);
  });

  it("givenRateRequest_whenFruitDoesNotExist_shouldRevertWithError", async () => {
    await expect(
      fruitContract
        .connect(buyer)
        .rate(strings.RATING_COMMENT, strings.RATING, strings.BIG_INDEX)
    ).to.revertedWith(errorMessages.ERROR_FRUIT_DOES_NOT_EXIST);
  });

  it("givenRateRequest_whenRaterIsPrevOwner_shouldRevertWithError", async () => {
    await expect(
      fruitContract.rate(
        strings.RATING_COMMENT,
        strings.RATING,
        strings.ONE_INDEX
      )
    ).to.revertedWith(errorMessages.ERROR_CANNOT_RATE_YOURSELF);
  });

  it("givenRateRequest_whenRateIsValid_shouldEmitSellerRated", async () => {
    await expect(
      fruitContract
        .connect(buyer)
        .rate(strings.RATING_COMMENT, strings.RATING, strings.ZERO_INDEX)
    ).to.emit(fruitContract, emits.SELLER_RATED);
  });

  it("givenGetRatingsRequest_whenUserNotRegistered_shouldRevertWithError", async () => {
    await expect(
      fruitContract.connect(random).getUserRatings()
    ).to.revertedWith(errorMessages.ERROR_USER_NOT_REGISTERED);
  });

  it("givenGetRatingsRequest_whenNoRating_shouldReturnEmptyArray", async () => {
    const ratings = await fruitContract.getUserRatings();
    expect(ratings).to.be.an(strings.EMPTY_ARRAY).that.is.empty;
  });

  it("givenRateRequest_whenRateIsValid_shouldUpdatePrevOwnerRatings", async () => {
    await fruitContract
      .connect(buyer)
      .rate(strings.RATING_COMMENT, strings.RATING, strings.ZERO_INDEX);

    const ratings = await fruitContract.connect(owner).getUserRatings();

    expect(ratings).to.be.an(strings.EMPTY_ARRAY).that.is.not.empty;
    expect(ratings[strings.ZERO_INDEX].buyer).to.equal(buyer.address);
    expect(ratings[strings.ZERO_INDEX].comment).to.equal(
      strings.RATING_COMMENT
    );
    expect(ratings[strings.ZERO_INDEX].rating).to.equal(strings.RATING);
    const noRatings = await fruitContract.connect(buyer).getUserRatings();
    expect(noRatings).to.be.an(strings.EMPTY_ARRAY).that.is.empty;
  });
});
