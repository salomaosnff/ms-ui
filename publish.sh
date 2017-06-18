echo -n 'Digite a mensagem de commit: '
read MESSAGE

BREAK=$'\n'
DATE=`date +%Y-%m-%d:%H:%M:%S`
COMMIT="Builded in ${DATE}${BREAK}${MESSAGE}"

yarn build:lib
git add -A
git commit -m "$COMMIT"
git push