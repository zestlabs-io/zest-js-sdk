version=$(shell cat package.json | jq -r .version)

.PHONY: build
build:
	npm run build

.PHONY: publish
publish:
	npm publish --access public

.PHONY: tag
tag:
	git tag $(version)

