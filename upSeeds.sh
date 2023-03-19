#!/bin/bash

started_at=$(date +"%s")

web=$(docker compose --file docker-compose.yaml ps | grep node-server | awk '{print $1}')

# Up Sequelize's seeds.
echo "-----> Upping application seeds"
docker exec -it "$web" sequelize db:seed:all
echo "<----- Seeds upped"

ended_at=$(date +"%s")

minutes=$(((ended_at - started_at) / 60))
seconds=$(((ended_at - started_at) % 60))

echo "-----> Done in ${minutes}m${seconds}s"
