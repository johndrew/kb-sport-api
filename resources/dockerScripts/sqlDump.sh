mysqldump \
    --databases rankingTable2018 \
    --master-data=2  \
    --single-transaction \
    --order-by-primary \
    -r /tmp/tmpsql/backup.sql \
    -uroot \
    -ppassword