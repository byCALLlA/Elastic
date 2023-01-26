const jwt = require("jsonwebtoken");
const connection = require("./db")

class ControllerSql {
    addInOrderList(req, res) {
        const token = req.headers['authorization'].split(' ')[1]
        const {id, role} = jwt.verify(token, process.env.SECRET)
        const sql = `INSERT INTO orders (date, dealers_id) VALUES ( ?, ?)`
        connection.query(sql, [new Date(), id], function (err, result) {
            if (err) {
                //console.log(err)
                return
            }
        })
        for (let i = 0; i < req.body.itemOrder.length; i++) {
            const arr = [req.body.itemOrder[i].id, req.body.itemOrder[i].quantity, req.body.itemOrder[i].min_price]
            const sql = `INSERT INTO production_has_orders (production_id, orders_id, quantity, price) VALUES ( ?, LAST_INSERT_ID(),  ?,?)`
            connection.query(sql, arr, function (err, result) {
                if (err) {
                    //console.log(err)
                }
                //console.log("Добавлен")                
            })
        }
    }
}

module.exports = ControllerSql
