# RUN: /Users/jneto/dev/proj/websites/anarp/scripts/deploy.sh

PROJ=anarp
SITE=anarp.org.pt
cd /Users/jneto/dev/proj/websites/$PROJ
npm run build
docker-machine ssh webserver rm -rf /home/ubuntu/websites/$SITE
docker-machine scp -r build webserver:/home/ubuntu/websites/$SITE