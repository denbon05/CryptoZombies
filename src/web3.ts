/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
// todo: remove 👆
import Web3 from 'web3';
import $ from 'jquery';
import { Contract } from 'web3-eth-contract';
import cryptoZombiesABI from './abi';

export const web3 = new Web3(Web3.givenProvider || 'ws://localhost:8545');

let cryptoZombies: Contract;
let userAccount: string;

function getZombieDetails(id: number) {
  return cryptoZombies.methods.zombies(id).call();
}

function zombieToOwner(id: number) {
  return cryptoZombies.methods.zombieToOwner(id).call();
}

function getZombiesByOwner(owner: string) {
  return cryptoZombies.methods.getZombiesByOwner(owner).call();
}

const displayZombies = async (ids: number[]) => {
  $('#zombies').empty();
  const zombieDetails = await Promise.all(ids.map(getZombieDetails));
  zombieDetails.forEach(
    (zombie: {
      name: any;
      dna: any;
      level: any;
      winCount: any;
      lossCount: any;
      readyTime: any;
    }) => {
      $('#zombies').append(`<div class="zombie">
      <ul>
        <li>Name: ${zombie.name}</li>
        <li>DNA: ${zombie.dna}</li>
        <li>Level: ${zombie.level}</li>
        <li>Wins: ${zombie.winCount}</li>
        <li>Losses: ${zombie.lossCount}</li>
        <li>Ready Time: ${zombie.readyTime}</li>
      </ul>
    </div>`);
    },
  );
};

function createRandomZombie(name: any) {
  // This is going to take a while, so update the UI to let the user know
  // the transaction has been sent
  $('#txStatus').text(
    'Creating new zombie on the blockchain. This may take a while...',
  );
  // Send the tx to our contract:
  return cryptoZombies.methods
    .createRandomZombie(name)
    .send({ from: userAccount })
    .on('receipt', (receipt: any) => {
      $('#txStatus').text(`Successfully created ${name}!`);
      // Transaction was accepted into the blockchain, let's redraw the UI
      getZombiesByOwner(userAccount).then(displayZombies);
    })
    .on('error', (error: any) => {
      // Do something to alert the user their transaction has failed
      $('#txStatus').text(error);
    });
}

function feedOnKitty(zombieId: any, kittyId: any) {
  $('#txStatus').text('Eating a kitty. This may take a while...');
  return cryptoZombies.methods
    .feedOnKitty(zombieId, kittyId)
    .send({ from: userAccount })
    .on('receipt', (receipt: any) => {
      $('#txStatus').text('Ate a kitty and spawned a new Zombie!');
      getZombiesByOwner(userAccount).then(displayZombies);
    })
    .on('error', (error: any) => {
      $('#txStatus').text(error);
    });
}

function levelUp(zombieId: any) {
  $('#txStatus').text('Leveling up your zombie...');
  return cryptoZombies.methods
    .levelUp(zombieId)
    .send({
      from: userAccount,
      value: web3.utils.toWei('0.001', 'ether'),
    })
    .on('receipt', (receipt: any) => {
      $('#txStatus').text('Power overwhelming! Zombie successfully leveled up');
    })
    .on('error', (error: any) => {
      $('#txStatus').text(error);
    });
}

const startApp = () => {
  const cryptoZombiesAddress = process.env.CRYPTO_ZOMBIE_CONTRACT_ADDRESS;
  cryptoZombies = new web3.eth.Contract(cryptoZombiesABI, cryptoZombiesAddress);
  console.log({ cryptoZombies });

  const accountInterval = setInterval(async () => {
    // Check if account has changed
    const accounts = await web3.eth.getAccounts();
    const [currentAccount] = accounts;
    if (currentAccount !== userAccount) {
      userAccount = currentAccount;
      // Call a function to update the UI with the new account
      getZombiesByOwner(userAccount).then(displayZombies);
    }
  }, 100);

  cryptoZombies.events
    .Transfer({ filter: { _to: userAccount } })
    .on('data', (event: { returnValues: any }) => {
      const data = event.returnValues;
      getZombiesByOwner(userAccount).then(displayZombies);
    })
    .on('error', console.error);
};

export default startApp;
