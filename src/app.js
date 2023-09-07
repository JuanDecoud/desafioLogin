import  express  from 'express';
import productRouter from './routers/products.router.js'
import cartsRouter from './routers/carts.router.js'
import viewRouter from './routers/views.router.js'
import messengerRouter from './routers/messengerRouter.js'
import userRouter from './routers/user.router.js';
import handlebars from 'express-handlebars'
import { Server } from 'socket.io';
import mongoose from 'mongoose'
import messengerModel from './dao/models/messenger.model.js'
import methodOverride from 'method-override'
import MongoStore from 'connect-mongo'
import session from 'express-session'
import passport from "passport";
import initializePassport from "./config/passport.config.js";
import compression from 'express-compression';
import errorHandler from './middlewares/errors.middleware.js'

///-------------------------------------------------------
const app = express ();
app.use(session({
    store: MongoStore.create({
        mongoUrl: 'mongodb+srv://juanjodecoud:JJjuanjitus22@cluster0.bpez36c.mongodb.net',
        dbName: 'SegundaPreEntrega',
        mongoOptions: {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    }),
    secret: 'juanSecret',
    resave: false,
    saveUninitialized: true
}))
app.use(errorHandler)
app.use(compression({brotli : {enable: true,zlib : {}}}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./src/public'))
app.use(methodOverride('_method'))
/// routers------------------------------------------------
app.use ('/products' , productRouter)
app.use ('/carts' , cartsRouter)
app.use ('/views' , viewRouter)
app.use('/messenger', messengerRouter)
app.use('/user', userRouter)
/// engine-------------------------------------------------
app.engine('handlebars' , handlebars.engine())
app.set('views','./src/views')
app.set('view engine' ,'handlebars')
//// passport 
initializePassport()
app.use(passport.initialize())
app.use(passport.session())
//runDev----------------------------------------------------
try{
    await mongoose.connect(`mongodb+srv://juanjodecoud:JJjuanjitus22@cluster0.bpez36c.mongodb.net/SegundaPreEntrega`)
    const serverHttp=app.listen(8080 , ()=>console.log("Server Up"))
    const io = new Server(serverHttp)
    app.set('socketio', io);
    io.on('connection' , (socket)=>{
        console.log("New Client Connected")
        socket.on ('productList' , async result =>{
            io.emit('updateProducts' , result)
        })
        socket.on ('messages',async data=>{
           await messengerModel.create({userMail :data.userMail , messege : data.messege})
           io.emit('updateMessages' , await messengerModel.find().lean())
        }) 
    })
}catch (err) {
  console.log (err.message)
}

