const FruitMarketplace = artifacts.require("FruitMarketplace");

contract("FruitMarketplace", (accounts) => {
    let contractInstance;

    before(async () => {
        contractInstance = await FruitMarketplace.deployed();
    });

    it("doit être déployé avec une adresse valide", async () => {
        assert.notEqual(contractInstance.address, 0x0, "L'adresse du contrat ne doit pas être 0x0");
    });
});