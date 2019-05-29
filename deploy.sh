git status
git add .
git commit
git push origin master

docker build -t ootz/socket-chat-server .
docker push ootz/socket-chat-server
