#!/bash/sh

echo "Which name do you want to your Database?"

read dbName

touch dbname.txt && echo "${dbName}" >| dbname.txt