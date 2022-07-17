#!/bash/sh

echo "What is the name of SQL File?"

read sqlFile

touch dbname.txt && echo "${sqlFile}" >| dbname.txt