import { expect } from "chai";
import { ethers } from "hardhat";

describe("FruitMarketplace", () => {
   let fruitContract;

   before(async () => {
        fruitContract = (await ethers.getContractFactory("FruitMarketplace")).deploy("Test");
        (await fruitContract).waitForDeployment()
    });

   it("should be deployed", async () => {
        expect(greeter.target).to.not.equal(0);
        expect(await greeter.greet()).to.equal("Test");
   });
});
