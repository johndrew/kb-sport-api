FROM mysql

# Prepare file structure
WORKDIR /tmp
RUN mkdir /tmp/tmpsql
RUN mkdir /tmp/tmpdata
RUN chmod 777 /tmp/tmpsql
RUN chmod 777 /tmp/tmpdata

# Copy scripts / startup helpers
COPY resources/startup.sh startup.sh
COPY resources/sqlDump.sh sqlDump.sh
COPY resources/delimitedTextDump.sh delimitedTextDump.sh
COPY resources/my.cnf /etc/mysql/my.cnf

# Prepare data
COPY data/ data/
RUN cat data/**/*.sql > data.sql