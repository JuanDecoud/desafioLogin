const generateErrorInfo = user => {
    return `
     The User Name selected : ${user.userName} is already in use
    `
}

export default generateErrorInfo