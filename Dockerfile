FROM mysql

# Prepare file structure
WORKDIR /tmp

# Copy scripts / startup helpers
COPY resources/dockerScripts/startup.sh startup.sh

# Prepare data
COPY data/ data/
RUN cat data/**/*.sql > data.sql