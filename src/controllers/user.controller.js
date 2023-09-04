import services from "../services/index.js"
import UserDTO from "../dto/user.dto.js"


export default class UserController {
    getCurrentUser = async (req,res)=>{
        try {
            let user = req.session.passport
            if (user){
                let result = await services.userService.getById(req.session.passport.user)
                let userDto = new UserDTO(result)
                if(result){
                    res.status(200).json ({
                        CurrentUser : {
                            userDto
                        }
                    })
                }
                else {res.status(404).json({error : 'No one user is online'})}
            } 
        } catch (error) {
            console.log(error)
            res.status(404).json({error : 'error'})
        }
    }

    
}