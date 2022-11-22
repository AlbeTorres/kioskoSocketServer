

const io= require('socket.io')({
    cors:{
        origin:"http://localhost:5173"
    }
})
const PORT = process.env.PORT || 8900;

let users=[]

const addUser=(datos)=>{
    !users.some(user=>user.id===datos.id) && users.push(datos);
    users = users.filter(user=>user.id!=='')
    
}

io.on('connection',(socket)=>{
    //usuario conectado
    console.log('usuario conectado'+socket.id)
    socket.emit("hello",  "Welcome to my website" );

    //obtener usuarios
    socket.on('addUser',({id,admin})=>{
        addUser({id,admin,socketid:socket.id})
        
    })

    //actualizar productos en tiempo real
    socket.on('estate',(id)=>{
        socket.broadcast.emit('cambioestado', id)
    })

    //actualizar pedidos en tiempo real dashboard
    socket.on('pedido',()=>{
       
        let admin = users.filter(user=>user.admin===true)
        if(admin.length!==0){
            admin.map(user=>socket.to(user.socketid).emit('newpedido','eso'))
        }
        
        
    })

    //usuario desconectado
    socket.on('disconnect',()=>{
        console.log('usuario desconectado')
    })
    

}
)

io.listen(PORT)