import {Router} from 'express'
import passport from 'passport'
import UserController from '../controllers/user.controller.js'

const userController = new UserController()
const user = Router ()


user.post('/login', passport.authenticate('login', { failureRedirect: '/views/loginError'}), async (req, res) => {
    res.redirect('/views/products')
})
user.post ('/register', passport.authenticate('register' ,{failureRedirect :'/views/register' , failureMessage: true}),async (req,res)=> {res.redirect('/views/login')})
user.get ('/registerGit', passport.authenticate('rGitHub' ,
{scope :'user:email'}),async (req,res)=> {
})


user.get ('/gitcallBack',passport.authenticate('rGitHub', { failureRedirect: '/views/loginError'}), async (req, res) => {res.redirect('/views/products')})

user.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) res.status(400).json({message : 'error'})
        return  res.redirect('/views/login')
    })
})

user.get(`/current` , userController.getCurrentUser)





export default user