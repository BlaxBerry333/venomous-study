.PHONY: dev build preview lint lint-fix format format-check spellcheck install clean


clean:
	rm -rf app/dist app/.astro

dev: clean
	cd app && npm run dev

build:
	cd app && npm run build

preview:
	cd app && npm run preview

lint:
	cd app && npm run lint

lint-fix:
	cd app && npm run lint:fix

format:
	cd app && npm run format

format-check:
	cd app && npm run format:check

spellcheck:
	cd app && npm run spellcheck

install:
	cd app && npm install
