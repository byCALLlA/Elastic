const jwt = require('jsonwebtoken')

module.exports = function(req, res, next) {
    if (req.method === 'OPTIONS') {
        next()
    }
    try {
        const token = req.headers['authorization'].split(' ')[1]
        if (!token) {
            return res.status(403).json({message: "пользователь не авторизован"})
        }
        const {id, role} = jwt.verify(token, process.env.SECRET)
        if (role !== 'customer' && role !== 'admin') {
            return res.status(403).json({message: " доступно только для customer"})
        }
        next()
    } catch (e) {        
        return res.status(403).json({message: "пользователь не авторизован"})
    }
}
