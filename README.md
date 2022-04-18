
## Description

Todo application for everyone

## Installation

```bash
make build
```

## Running the app

```bash
make up
```

After the first launch of containers
you need to open a new terminal tab.
Type command in terminal:

```bash
make up-migrate
```

If you want to down migration
you need type command in terminal:

```bash
make down-migrate
```

If you want to run application one command
you need type in terminal:

```bash
make start-one-click
```

## Stopping the app

For stop the project
Type command in terminal:

```bash
 make stop
```

## Downing the app

For downing containers and network the project
Type command in terminal:

```bash
 make down
```

## Removing the app

For remove all docker containers, images, networks, and volumes the project
Type command in terminal:

```bash
 make prune
```
