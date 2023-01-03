ci: lint test

install:
	npm ci

build:
	npm run build

fix:
	npm run fix

lint:
	npm run lint

test:
	npm run test

ganache:
	npm run ganache

truffle-migrate:
	npm run truffle-migrate

start:
	npm run serve

# TESTNETS

deploy-goerli:
	npx truffle migrate --network goerli

deploy-loom:
	npx truffle migrate --network loom_testnet

# HELPERS

stop-ganache:
	kill -9 $(lsof -t -i:8545) || echo 'Nothing to kill'

.PHONY: test build
