export default class UserDTO {
    constructor (user){
        this.id = user._id
        this.fullname = `${user.name} ${user.lastName}`
        this.email = user.userName
        this.cartId = user.cartId
    }
}