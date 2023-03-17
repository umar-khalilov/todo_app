#!/bin/bash

started_at=$(date +"%s")

web=$(docker compose --file docker-compose.yaml ps | grep node-server | awk '{print $1}')

# Down Sequelize's seeds.
echo "-----> Downing application seeds"
docker exec -it "$web" sequelize db:seed:undo:all
echo "<----- Seeds downed"

ended_at=$(date +"%s")

minutes=$(((ended_at - started_at) / 60))
seconds=$(((ended_at - started_at) % 60))

echo "-----> Done in ${minutes}m${seconds}s"
