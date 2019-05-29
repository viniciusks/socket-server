var app = require('express')()
var http = require('http').Server(app)
var io = require('socket.io')(http)

var clients = {}
var rooms = {}

app.get('/', function(req, res) {
    res.send('Server is running')
})

http.setHeader("Access-Control-Allow-Origin", "*")

// Código socket vem aqui
io.on('connection', function(client) {
    client.on('join_admin', function(room) {
        client.join(room)
    })

    client.on('join', function(name,email) {
        // Entrando em um channel privado
        let room_name = "private-" + name + "-" + email
        client.join(room_name)
        rooms[client.id] = room_name
        
        // Guarda o nome do usuário
        clients[client.id] = name
    })

    client.on('list_rooms', function(){
        client.emit('set_rooms', rooms)
    })
    
    client.on('send', function(item) {
        if(item.room == undefined){
            let response = {
                msg: item.msg,
                sender: "User"
            }
            // Envia a mensagem para uma room específica
            io.to(rooms[client.id]).emit('chat', response)
        } else {
            let response = {
                msg: item.msg,
                sender: "Support"
            }
            // Envia a mensagem para uma room específica
            io.to(item.room).emit('chat', response)
        }
    })

    client.on('disconnect', function(){
        console.log('Disconnect')        
        // Deleta do registro as informações de nome do usuário e a sala que ele criou
        delete clients[client.id]
        delete rooms[client.id]
    })
})

http.listen(3000, function(){
    console.log('Listening on port 3000')
})