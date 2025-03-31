const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("FruitMarketplace", () => {
   let fruitContract;

   before(async () => {
        fruitContract = (await ethers.getContractFactory("FruitMarketplace")).deploy("Test");
   });

   it("should be deployed", async () => {
        expect(greeter.target).to.not.equal(0);
        expect(await greeter.greet()).to.equal("Test");
   });
});
