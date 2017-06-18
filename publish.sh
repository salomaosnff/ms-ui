echo -n 'Digite a mensagem de commit: '

DATE=`date +%Y-%m-%d:%H:%M:%S`
read MESSAGE

yarn build:lib
git add -A
git commit -m "Builded in $DATE \n$MESSAGE"
git push