#!/bash/sh

sleep 1s

sqlFile=$(<sql_file_name.txt)
dbName=$(<dbname.txt)

SQL_PATH=${PWD}
mysql -e "
DROP SCHEMA IF EXISTS ${dbName};
CREATE SCHEMA IF NOT EXISTS ${dbName};
USE ${dbName};

# source ${SQL_PATH}/${sqlFile};
"

echo "'${dbName}' recreated using '${sqlFile}'!"