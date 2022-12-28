const ZombieFeeding = artifacts.require('ZombieFeeding');

module.exports = function (_deployer) {
  // Use deployer to state migration tasks.
  _deployer.deploy(ZombieFeeding);
};
