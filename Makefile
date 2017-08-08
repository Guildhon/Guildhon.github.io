main:
	gulp

dev:
	DEV=true gulp

serve:
	# see https://github.com/tj/serve
	node_modules/.bin/serve ../ -p 3000
