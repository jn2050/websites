# RUN: /Users/jneto/dev/proj/websites/dlogic.io/scripts/deploy.sh

DOMAIN=dlogic.io

cd /Users/jneto/dev/proj/websites/$DOMAIN
npm run build
docker-machine ssh webserver1 rm -rf /home/ubuntu/websites/$DOMAIN
docker-machine scp -r build webserver1:/home/ubuntu/websites/$DOMAIN


# aws s3 sync . s3://websites/$DOMAIN/assets --acl public-read