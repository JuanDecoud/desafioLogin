import userModel  from '../dao/models/user.model.js'


const validateUser = async(req,res,next)=>{
    let userName = req.body.userName 
    let password = req.body.password
    const user = await userModel.findOne({'userName': userName , 'password': password})
    
    if (user) {
       req.session.user=user
       console.log(req.session.user)
       return next()
    }
    else res.status(402).json({Status : 'Error' , message : "User or Password incorrects"})
}

export {validateUser}