import {Router} from 'express'
import {validateUser} from '../middlewares/user.middleware.js'
import userDb from '../dao/models/user.model.js'
import session from 'express-session'

const user = Router ()


user.post ('/login',validateUser,(req,res)=>{
   res.redirect('/views/products')
})

user.post ('/register', (req,res)=>{
    userDb.create({
        name : "Juan Jose" ,
        lastName : "Decoud",
        contry : "Argentina",
        city : "Mar Del Plata",
        adress : "505 934",
        userName : "juanjo.decoud@gmail.com" ,
        password: "1456" ,
        category : "admin",

    })
    res.send("ok")
})


user.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) res.status(400).json({message : 'error'})
        return  res.redirect('/views/login')
    })
})





export default user