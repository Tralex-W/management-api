#!/bin/bash

#Detach Mode
#PORT=3000
#NAME=management-api
#ENV=.env

docker run -d -p 3000:3000 --env-file .env --mount type=bind,source=./logs,target=/app/logs --name management-api management-api
