network:
	docker network create --attachable -d bridge test

rm-network:
	docker network rm test

