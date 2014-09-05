site:
	git fetch origin +master:master
	rm -rf target/site
	git clone . target/site -b master --single-branch
	mvn site

# fix refs in the 404 page so that it uses absolute urls
	sed -i 's:\(href\|src\)="\./:\1="/:g;' target/site/404.html
	sed -i 's#href="\([[:alpha:]].*/index.html\)#href="/\1#g;s:href="/http:href="http:g;' target/site/404.html

	cd target/site && git add -A && git commit -m 'Updated site' && git push

site-deploy:
	git push origin master
