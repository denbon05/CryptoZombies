const CryptoZombies = artifacts.require('ZombieFactory');
const utils = require('./helpers/utils');

const zombieNames = ['Zombie 1', 'Zombie 2'];

contract('CryptoZombies', (accounts) => {
  const [alice, bob] = accounts;
  let contractInstance;

  beforeEach(async () => {
    contractInstance = await CryptoZombies.new();
  });

  afterEach(async () => {
    await contractInstance.kill();
  });

  it('should be able to create a new zombie', async () => {
    // console.log('AAAA: ', contractInstance);
    const result = await contractInstance.createRandomZombie(zombieNames[0], {
      from: alice,
    });
    // console.log(result.logs[0].args);
    assert.equal(result.receipt.status, true);
    assert.equal(result.logs[0].args.name, zombieNames[0]);
  });

  it('should not allow two zombies', async () => {
    await contractInstance.createRandomZombie(zombieNames[0], { from: alice });
    await utils.shouldThrow(
      contractInstance.createRandomZombie(zombieNames[1], { from: alice }),
    );
  });
});