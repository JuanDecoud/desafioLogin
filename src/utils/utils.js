import bcrypt from 'bcrypt'
 
 function comprobateMongoId (string){
    let boolean = false 
    if (string.length === 24)boolean = true
    return boolean 
}

export {comprobateMongoId}

export const validatePassword = (password , user) =>{
    return bcrypt.compareSync(password,user.password)
}

export const encrypt = (password)=>{
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}