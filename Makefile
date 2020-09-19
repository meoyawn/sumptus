deploy:
	node nextgen.js
	vercel --prod
	say "front deployed"
