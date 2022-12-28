ci:
	npm ci

build:
	npm run build

fix:
	npx eslint --fix .

lint:
	npx eslint .

test:
	npx truffle test

.PHONY: test
