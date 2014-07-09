site:
	git fetch origin +master:master
	rm -rf target/site
	git clone . target/site -b master --single-branch
	mvn site
	cd target/site && git add -A && git commit -m 'Updated site' && git push

site-deploy:
	git push origin master
