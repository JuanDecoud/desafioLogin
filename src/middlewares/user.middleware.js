import userModel  from '../dao/models/user.model.js'
import services from '../services/index.js'


const validateUser = async(req,res,next)=>{
    let userName = req.body.userName 
    let password = req.body.password
    const user = await userModel.findOne({'userName': userName , 'password': password})
    if (user) {
       req.session.user=user
       return next()
    }
    else res.status(402).json({Status : 'Error' , message : "User or Password incorrects"})
}

const comprobateLoggueUser = async (req,res,next)=> {
    if (req.session.passport){
         next ()
    }
    else {
        res.status(404).json({messsage : "Debes ser un usuario logueado"})
    }
}

const comprobateAdmin = async (req,res,next)=>{
    let user =await services.userService.getById(req.session.passport.user)
    try {
        if(user.category === 'Admin') return next()
        else res.status(404).json ({message:'Only Admin have permission for this area'})
    } catch (error) {
        console.log(error)

    }
}

const comprobateUser = async (req,res,next)=>{
    let user = await services.userService.getById(req.session.passport.user)
    try {
        if(user.category === 'user') return next()
        else res.status(404).json ({message:'Only User have permission for this area'})
    } catch (error) {
        console.log(error)

    }
}

export {validateUser , comprobateLoggueUser , comprobateAdmin,comprobateUser}