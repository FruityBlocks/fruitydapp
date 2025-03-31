const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("FruitMarketplace", (m) => {
  const marketPlace = m.contract("FruitMarketplace", []);

  return { marketPlace };
});
