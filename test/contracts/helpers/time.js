const Web3 = require('web3');

const web3 = new Web3(Web3.givenProvider || 'ws://localhost:9545');
// console.log({ web3 });

async function increase(duration) {
  // first, let's increase time
  await web3.currentProvider.sendAsync(
    {
      jsonrpc: '2.0',
      method: 'evm_increaseTime',
      params: [duration], // there are 86400 seconds in a day
      id: new Date().getTime(),
    },
    () => {},
  );

  // next, let's mine a new block
  web3.currentProvider.send({
    jsonrpc: '2.0',
    method: 'evm_mine',
    params: [],
    id: new Date().getTime(),
  });
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
