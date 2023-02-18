FROM postgres:13-alpine

# Set environment variables
ENV POSTGRES_USER=myuser
ENV POSTGRES_PASSWORD=mypassword
ENV POSTGRES_DB=mydatabase

# Copy initialization scripts to the container
COPY init.sql /docker-entrypoint-initdb.d/

# Expose default PostgreSQL port
EXPOSE 5432