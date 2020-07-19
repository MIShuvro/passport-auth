var Route = require('express').Router()

const passport = require('passport')


const { register, login, users, me } = require('../controller/UserController')
const { session } = require('passport')

Route.post('/register', register)


Route.post('/login', passport.authenticate('local-login', { session: false }), login)


Route.get('/users', users)

Route.get('/me', passport.authenticate("jwt", { session: false }) ,me)


module.exports = Route;
