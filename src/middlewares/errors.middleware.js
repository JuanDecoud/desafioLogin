import EErros from "../services/errors/enums.js";

export default (error, req, res, next) => {
    switch (error.code) {
        case EErros.NO_STOCK:
            res.status(400).json({ status: 'error', error: error.name})
            break;
        default:
            res.send({ status: 'error', error: 'Unhandled error'})
            break;
    }
}