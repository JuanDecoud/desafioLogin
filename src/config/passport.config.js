import passport from "passport"
import local from 'passport-local'
import userModel from '../dao/models/user.model.js'
import { encrypt, validatePassword } from '../utils/utils.js'
import GitHubStrategy from 'passport-github2'

const LocalStrategy = local.Strategy

const initializePassport = () => {

    passport.use ('rGitHub' , new GitHubStrategy({
        clientID:'Iv1.61a5a8c640773e8d' ,
        clientSecret :'e5d53a4686cda97203b0f6f89fb70f2c74991053',
        callbackURL :'http://localhost:8080/user/gitcallBack'
    } ,async (accessToken,refreshToke,profile,done)=>{
        console.log(profile)
        try{
            let user = await userModel.findOne({userName : profile._json.email})
            if(user)return done(null,user)
            const newuser = await userModel.create({
                userName : profile._json.email,
                name : profile._json.name
            })
            return done (null, newuser)
        }
        catch (err){
            return done ('error')
        }
    }))
    
   
    passport.use('register', new LocalStrategy({
        passReqToCallback: true,
        usernameField: 'username'
    }, async(req, username, password, done) => {
        
        const { name, lastname, country, city,address} = req.body
        try {
            const user = await userModel.findOne({ userName: username })
            if (user) {
                console.log('User already exists')
                return done(null, false)
            }
            const newUser = {
                name, lastName : lastname, country , city,address,userName : username, password: encrypt(password) 
            }
            
            const result = await userModel.create(newUser)
            return done(null, result)
        } catch(err) {
            return done('error al obtener el user')
        }
    }))

    passport.use('login', new LocalStrategy({
        usernameField: 'username'
    }, async(username, password, done) => {
        try {
            const user = await userModel.findOne({ userName: username })
            if (!user ) {
                return done(null, false)
            }

            if (!validatePassword(password, user)) return done(null, false)
            return done(null, user)
        } catch(err) {
            console.log(err)
        }
    }))

    passport.serializeUser((user, done) => {
        done(null, user._id)
    })

    passport.deserializeUser(async (id, done) => {
        const user = await userModel.findById(id)
        done(null, user)
    })

}

export default initializePassport