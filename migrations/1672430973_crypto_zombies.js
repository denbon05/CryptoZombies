const CryptoZombies = artifacts.require('CryptoZombies');

module.exports = function (_deployer) {
  _deployer.deploy(CryptoZombies);
};
