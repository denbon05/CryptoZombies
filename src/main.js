import startApp from '.';

window.addEventListener('load', () => {
  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    // Use Mist/MetaMask's provider
  } else {
    // Handle the case where the user doesn't have Metamask installed
    // Probably show them a message prompting them to install Metamask
    console.log("Probably Metamask doesn't have installed");
  }

  // Now you can start your app & access web3 freely:
  startApp();
});
