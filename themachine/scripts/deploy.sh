# RUN: /Users/jneto/dev/proj/websites/themachine/deploy.sh

PROJ=themachine
SITE=themachine.global
cd /Users/jneto/dev/proj/websites/$PROJ
npm run build
docker-machine ssh webserver rm -rf /home/ubuntu/websites/$SITE
docker-machine scp -r build webserver:/home/ubuntu/websites/$SITE
