### hotlinks for build stuff
DOCKERFILE = ./docker-compose.yaml
DOCKERDIR = ./
INITIALSCRIPTS = ./run-migrations-seeds.sh
DOWNMIGRATION = ./down-migrations.sh
STARTONECLICK = ./start-dev.sh

build:
	docker-compose -f ${DOCKERFILE} --project-directory ${DOCKERDIR} build
up:
	docker-compose -f ${DOCKERFILE} --project-directory ${DOCKERDIR} up
up-migrate:
	${INITIALSCRIPTS}
down-migrate:
	${DOWNMIGRATION}
start-one-click:
	${STARTONECLICK}
stop:
	docker-compose -f ${DOCKERFILE} --project-directory ${DOCKERDIR} stop
down:
	docker-compose -f ${DOCKERFILE} --project-directory ${DOCKERDIR} down
logs:
	docker-compose -f ${DOCKERFILE} --project-directory ${DOCKERDIR} logs --follow ${c}
prune:
	docker system prune --all && docker system prune --volumes
