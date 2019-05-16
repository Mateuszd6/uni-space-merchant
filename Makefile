all:
	tsc --build --pretty false

# Because the testing framework lacks of functionality we must pass to it the
# uri of the web page we are testing. We create a .ts file with this uri in
# Makefile. This is horribly hacky, but its the only solution that I've came up
# with that works everywere and does not require user to install one million
# additional libraries just to read some files.
validate: update all
	@echo -n 'let game_url = "file://' > ./test/uri.ts
	@echo -n $(shell pwd) >> ./test/uri.ts
	@echo -n '/game.html"; let index_url = "file://' >> ./test/uri.ts
	@echo -n $(shell pwd) >> ./test/uri.ts
	@echo -n '/index.html"; export {game_url, index_url};' >> ./test/uri.ts
	@./validate.sh

update:
	npm update

clean:
	rm dist/*
