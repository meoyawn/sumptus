deploy:
	node nextgen.js
	vercel --prod
	say "sumptum deployed"
