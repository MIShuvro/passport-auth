const passport = require('passport')
const User = require('./model/User')
const { show } = require('quick-crud')

const LocalStrategy = require('passport-local').Strategy
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

const { sign } = require('jsonwebtoken')

passport.use("local-login", new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {

    const user = await show({ model: User, where: { email } })

    if (!user) return done("Invalid Credentials");

    const matched = await user.comparePassword(password)
    if (!matched) return done("Invalid Credentials.");

    const authPayload = {
        token: sign({ _id: user._id }, 'secret'),
        user
    }

    done(null, authPayload)

}))

passport.use('jwt', new JwtStrategy({
    secretOrKey: "secret",
    jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken(),
        ExtractJwt.fromUrlQueryParameter("token"),
        ExtractJwt.fromBodyField("token")
    ])
}, (payload, done) => {
    done(null, payload)
}))