#!/bash/sh

echo "What is the name of SQL File? *without .sql extension*"

read sqlFile

touch sql_file_name.txt && echo "${sqlFile}.sql" >| sql_file_name.txt