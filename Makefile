install:
	npm install

dev:
	./node_modules/.bin/webpack-dev-server --content-base public

build:
	./node_modules/.bin/webpack --optimize-minimize

test:
	@echo "FIXME: write some smoke tests."

deploy: build
	sh ./tools/deploy-to-gh-pages.sh
