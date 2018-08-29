FROM mysql

WORKDIR /tmp

COPY data/ data/
RUN cat data/**/*.sql > data.sql