import {Router} from 'express'
import {validateUser} from '../middlewares/user.middleware.js'
import userDb from '../dao/models/user.model.js'
import session from 'express-session'
import passport from 'passport'
import userModel from '../dao/models/user.model.js'

const user = Router ()


user.post('/login', passport.authenticate('login', { failureRedirect: '/views/loginError'}), async (req, res) => {
    
    res.redirect('/views/products')
})

user.post ('/register', passport.authenticate('register' ,
{failureRedirect :'/views/registerError'}),async (req,res)=> {
    res.redirect('/views/login')
})

user.get ('/registerGit', passport.authenticate('rGitHub' ,
{scope :'user:email'}),async (req,res)=> {
})


user.get ('/gitcallBack',passport.authenticate('rGitHub', { failureRedirect: '/views/loginError'}), async (req, res) => {
    console.log(req.user)
    req.session.user=req.user
    res.redirect('/views/products')
})

user.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) res.status(400).json({message : 'error'})
        return  res.redirect('/views/login')
    })
})

user.get(`/current` , async (req,res)=>{
  let  user = await userModel.findById(req.session.passport.user).lean()
    res.status(200).json ({
        CurrentUser : {
            user
        }
    })
})





export default user