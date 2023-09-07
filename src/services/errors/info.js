const cartError = cart => {
    return `
     The Cart  selected : ${cart._id} not exist
    `
}

const stockError = products => {
    let message = ` No hay stock disponible de los siguienters productos: `
    products.forEach(product => {
         message += product
    });
    return message
    
}

export default { cartError , stockError}