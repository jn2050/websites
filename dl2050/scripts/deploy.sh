# RUN: /Users/jneto/dev/proj/websites/dl2050/scripts/deploy.sh

PROJ=dl2050
SITE=dl2050.com
cd /Users/jneto/dev/proj/websites/$PROJ
npm run build
docker-machine ssh webserver rm -rf /home/ubuntu/websites/$SITE
docker-machine scp -r build webserver:/home/ubuntu/websites/$SITE


# aws s3 ls --recursive s3://dlogic-websites/dl2050.com/images
# aws s3 cp /Users/jneto/Desktop/world-map.jpg s3://dlogic-websites/dl2050.com/images/world-map.jpg
# aws s3 rm s3://dlogic-websites/dl2050.com/images