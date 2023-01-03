# truffle-example

<p>Project for practice with solidity</p>

## Dev mode

### Run local blockchain

```bash
make ganache # 1st terminal
```

<p>After the blockchain network will be launched run:</p>

```bash
make truffle-migrate # 2th terminal
```

<p>Define next env vars in <i>./.env</i> file:</p>
<ul>
  <li>CRYPTO_ZOMBIE_CONTRACT_ADDRESS</li>
  <li>MNEMONIC</li>
  <li>INFURA_API_KEY - for 
    <a href="https://cryptozombies.io/en/lesson/10/chapter/6" target="_blank">
      goerli
    </a> testnet
  </li>
  <li>LOOM_PRIVATE_KEY - for 
    <a href="https://cryptozombies.io/en/lesson/10/chapter/8" target="_blank">
      loom
    </a> local testnet
  </li>
</ul>

### Run dApp

```bash
make start # http://localhost:9000
```

### Run tests

```bash
make test
```

#### References

<ul>
  <li>
    <a href="https://cryptozombies.io/en/lesson/10/chapter/10" target="_blank">
      Deploy to the Basechain
    </a>
  </li>
  <!-- <li><a href="" target="_blank"></a></li> -->
</ul>
