const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("NewFruitMarketPlace", (m) => {
  const marketPlace = m.contract("NewFruitMarketPlace", []);

  return { marketPlace };
});
