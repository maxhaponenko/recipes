const { Router } = require('express')
const router = Router()
const bcrypt = require('bcryptjs')
const { check, run, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const config = require('config')

// Models
const User = require('../models/User')

const accessTokenExp = config.get('accessTokenExpiration')
const refreshTokenExp = config.get('refreshTokenExpiration')

const validateSignup = async (request) => {
    await check('email', 'Email not real').isEmail().run(request)
    await check('password', 'Password should be more than 6 digits').isLength({min: 7}).run(request)
    const errors = validationResult(request)
    return errors
}

router.post(
    '/signup',
    async (request, response) => {
        try {

            const errors = await validateSignup(request)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    toastType: 3,
                    toastMessage: 'Please check credentials',
                    isAuthenticated: false
                })
            }

            const { email, password, firstName, lastName } = request.body

            const candidate = await User.findOne({ email: email })
            if (candidate) {
                return response.status(400).json({ 
                    toastType: 3,
                    toastMessage: 'Such user exists',
                    isAuthenticated: false
                })
            }

            const hashedPassword = await bcrypt.hash(password, 12)
            const user = new User({
                email: email,
                password: hashedPassword,
                firstName: firstName,
                lastName: lastName,
                registeredAt: new Date(),
                userType: 1
            })

            await user.save()
            response.status(201).json({
                toastType: 1, 
                toastMessage: 'User created',
                isAuthenticated: false
            })

        } catch (e) {
            response.status(500).json({
                toastType: 4,
                toastMessage: 'Something went wrong',
                isAuthenticated: false
            })
        }
    }
)

const validateLogin = async (request) => {
    await check('email', 'Enter correct password').normalizeEmail().isEmail().run(request)
    await check('password', 'Password should be more than 6 digits').exists().run(request)
    const errors = validationResult(request)
    return errors
}

router.post(
    '/login',
    async (request, response) => {
        try {
            
            const errors = await validateLogin(request)
            if (!errors.isEmpty()) {
                return response.status(400).json({
                    errors: errors.array(),
                    toastType: 3,
                    toastMessage: 'Please check credentials',
                    isAuthenticated: false
                })
            }

            const { email, password } = request.body

            const dbUser = await User.findOne({ email: email })

            if (dbUser === undefined || dbUser === null) {
                return response.status(400).json({
                    toastType: 4,
                    toastMessage: 'Something went wrong -> No user in DB',
                    isAuthenticated: false
                })
            } else {
                const isMatch = await bcrypt.compare(password, dbUser.password)
                if (!isMatch) {
                    return response.status(400).json({ 
                        toastType: 4,
                        toastMessage: 'Wrong password, try again',
                        isAuthenticated: false,
                    })
                }
            }

            const accessToken = jwt.sign(
                { _id: dbUser._id },
                config.get('jwtSecret'),
                { expiresIn: accessTokenExp }
            )

            const refreshToken = jwt.sign(
                { _id: dbUser._id },
                config.get('jwtSecret'),
                { expiresIn: refreshTokenExp }
            )

            await User.findOneAndUpdate({_id: dbUser._id}, {
                accessToken: accessToken,
                refreshToken: refreshToken
            })

            response.json({ 
                toastType: 1,
                toastMessage: 'You are in!',
                isAuthenticated: true,
                userType: dbUser.userType,
                accessToken: accessToken,
                refreshToken: refreshToken,
                userId: dbUser._id,
                firstName: dbUser.firstName,
                lastName: dbUser.lastName,
                email: dbUser.email, 
            })

        } catch (e) {
            response.status(500).json({
                toastType: 4,
                toastMessage: 'Something went wrong',
                isAuthenticated: false,
            })
        }
    }
)

router.post(
    '/GetNewTokens',
    async (req, res) => {
        try {
            const { userId, refreshToken } = req.body

            const user = await User.findOne({_id: userId})

            if (user.refreshToken === refreshToken) {
                const accessToken = jwt.sign(
                    { _id: user._id },
                    config.get('jwtSecret'),
                    { expiresIn: accessTokenExp }
                )
                const refreshToken = jwt.sign(
                    { _id: user._id },
                    config.get('jwtSecret'),
                    { expiresIn: refreshTokenExp }
                )
                await User.findOneAndUpdate({_id: userId}, {accessToken: accessToken, refreshToken: refreshToken})
                res.status(200).json({
                    isAuthenticated: true,
                    accessToken: accessToken,
                    refreshToken: refreshToken,
                    toastType: 2,
                    toastMessage: 'refreshToken is updated!'
                })
            } else {
                res.status(403).json({
                    isAuthenticated: false,
                    toastType: 4,
                    toastMessage: 'wrong refreshToken. We logged out your session'
                })
            }
        } catch(e) {
            console.log(e)
        }
    }
)
router.post(
    '/logout',
    async (req, res) => {
        try {
            const { userId } = req.body
            await User.findOneAndUpdate({_id: userId}, {accessToken: '', refreshToken: ''}, null, (err, doc) => {
                if (err) {
                    res.status(200).json({
                        isAuthenticated: false,
                        toastType: 2,
                        toastMessage: 'You are logged out!'
                    })
                } else {
                    res.status(200).json({
                        isAuthenticated: false,
                        toastType: 2,
                        toastMessage: 'You are logged out!'
                    })
                }
            })
            
        } catch(e) {
            console.log(e)
        }
    }
)

module.exports = router