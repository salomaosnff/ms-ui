echo -m 'Digite a mensagem de commit: '

DATE=`date+%Y-%m-%d:%H:%M:%S`
MESSAGE=read

yarn build:lib
git add -A
git commit -m "Builded in $DATE \n$MESSAGE"
git push