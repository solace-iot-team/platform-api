# integration-test

## prerequisites

* **node**
* **npm**
* **docker**

````bash
cd {root}/platform-api/api-implementation
npm install
# npm run compile
#
# # run in development mode
# npm run dev
#
# # run tests
# npm run test
````

## environment variables

[Add your secrets - see instructions here](./template.source.secrets.env.sh).
````bash
source source.secrets.env.sh
````

[Standard environment:](./source.env.sh)
````bash
source source.env.sh
````

## start mongo in docker
````bash
./start.mongo.sh

# check if user is automatically set-up / login ok
docker exec -it integration-mongodb bash
mongo -u platform-user -p platform-user-password --authenticationDatabase platform
# docker logs
docker logs integration-mongodb
````
### stop mongo
````bash
./stop.mongo.sh
````
## local integration test

````bash

````





----
