all:
	tsc --build --pretty false

validate:
	./validate.sh

clean:
	rm dist/*
