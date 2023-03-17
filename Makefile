### hotlinks for build stuff
DOCKERFILE = ./docker-compose.yaml
DOCKERDIR = ./

build:
	docker compose -f ${DOCKERFILE} --project-directory ${DOCKERDIR} build
up:
	docker compose -f ${DOCKERFILE} --project-directory ${DOCKERDIR} up
start-one-click:
	./startDev.sh
up-migrations:
	./upMigrations.sh
down-migrations:
	./downMigrations.sh
up-seeds:
	./upSeeds.sh
down-seeds:
	./downSeeds.sh
stop:
	docker compose -f ${DOCKERFILE} --project-directory ${DOCKERDIR} stop
down:
	docker compose -f ${DOCKERFILE} --project-directory ${DOCKERDIR} down
logs:
	docker compose -f ${DOCKERFILE} --project-directory ${DOCKERDIR} logs --follow ${c}
prune:
	docker system prune --all && docker system prune --volumes
