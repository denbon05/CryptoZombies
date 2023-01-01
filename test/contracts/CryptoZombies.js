const CryptoZombies = artifacts.require('CryptoZombies');
const utils = require('./helpers/utils');
const time = require('./helpers/time');

const zombieName1 = 'Zombie 1';
const zombieName2 = 'Zombie 2';

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
    const result = await contractInstance.createRandomZombie(zombieName1, {
      from: alice,
    });
    const [meta] = result.logs;

    expect(result.receipt.status).to.equal(true);
    expect(meta.args.name).to.equal(zombieName1);
  });

  it('should not allow two zombies', async () => {
    await contractInstance.createRandomZombie(zombieName1, { from: alice });
    await utils.shouldThrow(
      contractInstance.createRandomZombie(zombieName2, { from: alice }),
    );
  });

  context('with the single-step transfer scenario', async () => {
    it('should transfer a zombie', async () => {
      const {
        logs: [
          {
            args: { zombieId },
          },
        ],
      } = await contractInstance.createRandomZombie(zombieName1, {
        from: alice,
      });
      await contractInstance.transferFrom(alice, bob, zombieId, {
        from: alice,
      });
      const newOwner = await contractInstance.ownerOf(zombieId);

      expect(newOwner).to.equal(bob);
    });
  });

  context('with the two-step transfer scenario', async () => {
    it('should approve and then transfer a zombie when the approved address calls transferFrom', async () => {
      const {
        logs: [
          {
            args: { zombieId },
          },
        ],
      } = await contractInstance.createRandomZombie(zombieName1, {
        from: alice,
      });
      await contractInstance.approve(bob, zombieId, { from: alice });
      await contractInstance.transferFrom(alice, bob, zombieId, {
        from: bob,
      });

      const newOwner = await contractInstance.ownerOf(zombieId);
      expect(newOwner).to.equal(bob);
    });

    it('should approve and then transfer a zombie when the owner calls transferFrom', async () => {
      const {
        logs: [
          {
            args: { zombieId },
          },
        ],
      } = await contractInstance.createRandomZombie(zombieName1, {
        from: alice,
      });
      await contractInstance.approve(bob, zombieId, { from: alice });
      await contractInstance.transferFrom(alice, bob, zombieId, {
        from: alice,
      });
      const newOwner = await contractInstance.ownerOf(zombieId);
      expect(newOwner).to.equal(bob);
    });
  });

  it('zombies should be able to attack another zombie', async () => {
    const {
      logs: [
        {
          args: { zombieId: firstZombieId },
        },
      ],
    } = await contractInstance.createRandomZombie(zombieName1, {
      from: alice,
    });

    const {
      receipt,
      logs: [
        {
          args: { zombieId: secondZombieId },
        },
      ],
    } = await contractInstance.createRandomZombie(zombieName2, {
      from: bob,
    });

    await time.increase(time.duration.days(1));
    await contractInstance.attack(firstZombieId, secondZombieId, {
      from: alice,
    });
    expect(receipt.status).to.equal(true);
  });
});
