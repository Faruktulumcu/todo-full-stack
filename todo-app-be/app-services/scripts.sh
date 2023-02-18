#docker build -t demo-postgres-image .

docker run -p 5433:5432 --name demo-postgres-container -d demo-postgres-image