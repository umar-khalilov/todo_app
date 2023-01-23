### hotlinks for build stuff
DOCKERFILE = ./docker-compose.yaml
DOCKERDIR = ./

build:
	docker compose -f ${DOCKERFILE} --project-directory ${DOCKERDIR} build
up:
	docker compose -f ${DOCKERFILE} --project-directory ${DOCKERDIR} up
up-migrate:
	./runMigrationsSeeds.sh
down-migrate:
	./downMigrations.sh
start-one-click:
	./startDev.sh
stop:
	docker compose -f ${DOCKERFILE} --project-directory ${DOCKERDIR} stop
down:
	docker compose -f ${DOCKERFILE} --project-directory ${DOCKERDIR} down
logs:
	docker compose -f ${DOCKERFILE} --project-directory ${DOCKERDIR} logs --follow ${c}
prune:
	docker system prune --all && docker system prune --volumes
