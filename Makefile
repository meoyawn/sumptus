deploy:
	rm -rf .next
	node nextgen.js
	yarn build
	say "front deployed"
