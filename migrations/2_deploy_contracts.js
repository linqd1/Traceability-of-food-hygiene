var SimpleStorage = artifacts.require("./SimpleStorage.sol");
var LeanMeat = artifacts.require("./LeanMeat.sol");

module.exports = function(deployer) {
  deployer.deploy(SimpleStorage);
  deployer.deploy(LeanMeat);
};
