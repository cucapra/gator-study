run:
	rm dist/main_page* || true
	npm run build
	cp dist/main_page*.js templates/static/js/main_page.js
	cp dist/main_page*.js.map templates/static/js/main_page.js.map
	flask run

clean:
	npm clean