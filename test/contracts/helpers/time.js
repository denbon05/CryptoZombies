const Web3 = require('web3');

const web3 = new Web3(Web3.givenProvider || 'ws://localhost:8545');

async function increase(duration) {
  // console.log('web3: ', web3.currentProvider);
  // first, let's increase time
  const increaseTime = new Promise((resolve, reject) => {
    web3.currentProvider.send(
      {
        jsonrpc: '2.0',
        method: 'evm_increaseTime',
        params: [duration], // there are 86400 seconds in a day
        id: new Date().getTime(),
      },
      (err) => {
        if (err) {
          return reject(err);
        }
        return resolve();
      },
    );
  });

  // next, let's mine a new block
  const mineBlock = new Promise((resolve, reject) => {
    web3.currentProvider.send(
      {
        jsonrpc: '2.0',
        method: 'evm_mine',
        params: [],
        id: new Date().getTime(),
      },
      (err) => {
        if (err) {
          return reject(err);
        }
        return resolve();
      },
    );
  });

  await Promise.all([increaseTime, mineBlock]);
}

const duration = {
  seconds(val) {
    return val;
  },
  minutes(val) {
    return val * this.seconds(60);
  },
  hours(val) {
    return val * this.minutes(60);
  },
  days(val) {
    return val * this.hours(24);
  },
};

module.exports = {
  increase,
  duration,
};
