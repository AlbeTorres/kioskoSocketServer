const io= require('socket.io')({
    cors:{
        origin: 'http://localhost:5173'

    }
})

io.on('connection',(socket)=>{
    //usuario conectado
    console.log('usuario conectado'+socket.id)

    socket.on('producto estado',()=>{
        io.emit('getproductos','eso')
    })

    //usuario desconectado
    socket.on('disconnect',()=>{
        console.log('usuario desconectado')
    })
    

}
)

io.listen(8900)