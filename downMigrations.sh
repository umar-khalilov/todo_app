#!/bin/bash

started_at=$(date +"%s")

web=$(docker compose --file docker-compose.yaml ps | grep main | awk '{print $1}')

# Down Sequelize's migrations.
echo "-----> Downing application migrations"
docker exec -it "$web" sequelize db:migrate:undo:all
echo "<----- Migrations downed"

ended_at=$(date +"%s")

minutes=$(((ended_at - started_at) / 60))
seconds=$(((ended_at - started_at) % 60))

echo "-----> Done in ${minutes}m${seconds}s"
