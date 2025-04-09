const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("FruitMarketPlace", (m) => {
  const marketPlace = m.contract("FruitMarketPlace", []);

  return { marketPlace };
});
