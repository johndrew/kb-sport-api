mysqldump \
    --tab=/tmp/tmpdata \
    --fields-terminated-by ',' \
    --fields-enclosed-by '"' \
    --lines-terminated-by 0x0d0a \
    rankingTable2018 \
    --master-data=2 \
    --single-transaction \
    --order-by-primary \
    -ppassword