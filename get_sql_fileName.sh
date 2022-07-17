#!/bash/sh

echo "What is the name of SQL File?"

read sqlFile

touch sql_file_name.txt && echo "${sqlFile}" >| sql_file_name.txt