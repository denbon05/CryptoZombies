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

<p>Copy <i>contract address</i> and set value <i>CRYPTO_ZOMBIE_CONTRACT_ADDRESS</i> env var into <i>.env</i> file.</p>
<p>Define vars in <i>config/web3.json</i> as in <i>config/web3.example.json</i></p>

### Run dApp

```bash
make start # http://localhost:9000
```

### Run tests

```bash
make test
```
