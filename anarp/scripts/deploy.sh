# RUN: /Users/jneto/dev/proj/websites/anarp/scripts/deploy.sh

# aws s3 sync images s3://dlogic-websites/anarp/images
# aws s3 ls --recursive s3://dlogic-websites/anarp

PROJ=anarp
SITE=anarp.org.pt
cd /Users/jneto/dev/proj/websites/$PROJ
npm run build
docker-machine ssh webserver rm -rf /home/ubuntu/websites/$SITE
docker-machine scp -r build webserver:/home/ubuntu/websites/$SITE