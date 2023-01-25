const Order = require('../models/Order.js')
const User = require('../models/User.js')
const jwt = require('jsonwebtoken')

class Controller {
    async addInOrderList(req, res) {
        const token = req.headers['authorization'].split(' ')[1]
        const {id} = jwt.verify(token, process.env.SECRET)
        const author = await User.findOne({_id: id})
        let q = await Order.findOne({}).sort({numberOrder: -1})
        let num = !q ? 1 : q.numberOrder + 1
        const data = req.body
        const item = new Order({
            numberOrder: num, author: author.email, date: data.date, itemOrder: data.itemOrder
        })
        await item.save()
        res.json({message: "Заказ  добавлен"})
    }
}

module.exports = Controller
