deploy:
	rm -rf .next
	rm -rf out
	node nextgen.js
	yarn build
	say "front deployed"
