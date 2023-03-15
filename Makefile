install:
	npm ci 

test:
	npx jest

fix_lint:
	npx eslint --no-eslintrc --config .eslintrc.yml --fix .

lint:
	npx eslint --no-eslintrc --config .eslintrc.yml .

test_coverage:
	npx jest --coverage 

build:
	NODE_ENV=production npx webpack
develop:
	npx webpack serve