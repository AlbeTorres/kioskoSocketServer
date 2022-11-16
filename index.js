const io= require('socket.io')({
    cors:{
        origin: 'http://localhost:5173'
    }
})

let count = 0;
io.on('connection',(socket)=>{
    //usuario conectado
    count=count+1
    console.log('usuario conectado'+socket.id+count)

    socket.on('estado',(msg)=>{
        console.log(msg)
        socket.broadcast.emit('getproductos','msg')
    })

    //usuario desconectado
    socket.on('disconnect',()=>{
        console.log('usuario desconectado')
    })
    

}
)

io.listen(8900)