version=$(shell cat package.json | jq -r .version)

.PHONY: generate
generate:
	@./openapi/generate.sh nocopy

prettier:
	@npm run prettier

.PHONY: build
build: generate prettier
	npm run build

.PHONY: publish
publish: build
	npm publish --access public

.PHONY: tag
tag:
	git tag v$(version)
	git push origin v${version}

.PHONY: new-patch
new-patch:
	npm version patch

.PHONY: new-minor
new-minor:
	npm version minor

.PHONY: new-major
new-major:
	npm version major

.PHONY: release-patch
release-patch: new-patch build publish
	echo "Released version $(cat package.json | jq -r .version)"

.PHONY: release-minor
release-minor: new-minor build publish
	echo "Released version $(cat package.json | jq -r .version)"