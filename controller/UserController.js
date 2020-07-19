const User = require('../model/User')
const { store, index, show } = require('quick-crud')


const users = async (req, res) => {
    res.json(await index({ model: User }))
}

const me = async (req, res) => {
    const user = await show({ model: User, where: { _id: req.user._id } })
    if (!user) return res.send("Invaild token");
    res.json(user)
}


const register = async (req, res) => {

    const { email, password } = req.body

    const user = await store({ model: User, data: { email, password } })

    res.json(user)
}

const login = (req, res) => {
    res.send(req.user)
}

module.exports = { users, register, login, me }