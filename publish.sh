echo -n 'Digite a mensagem de commit: '
read MESSAGE

BREAK=$'\n'
DATE=`date +"%d/%m/%Y ás %H:%M:%S"`
COMMIT="Build feito em ${DATE}${BREAK}${MESSAGE}"

yarn build
git add -A
git commit -m "$COMMIT"
git push