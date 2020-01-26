# RUN: /Users/jneto/dev/proj/websites/dlogic/scripts/deploy.sh

PROJ=dlogic
cd /Users/jneto/dev/proj/websites/$PROJ
npm run build
docker-machine ssh webserver rm -rf /home/ubuntu/websites/$PROJ
docker-machine scp -r build webserver:/home/ubuntu/websites/$PROJ
