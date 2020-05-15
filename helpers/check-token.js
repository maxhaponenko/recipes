const config = require('config')
var jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to varify users authentication access
function checkToken(req, res, next) {
    if (req.headers) {
        // debugger
        const authHeader = req.headers['authorization'];
        if (typeof authHeader !== undefined) {
            const bearer = authHeader.split(' ');
            const accessToken = bearer[1];
            
            jwt.verify(accessToken, config.get('jwtSecret'), (err, decoded) => {
                if (err) {
                    if (err.name === 'TokenExpiredError') {
                        res.status(403).json({
                            toastType: 4,
                            toastMessage: 'Token expired Error'
                        })
                    } else {
                        res.status(403).json({
                            toastType: 4,
                            toastMessage: 'Token Error. ' + err
                        })
                    }
                } else if (decoded) {
                    User.findOne({_id: decoded._id}, (err, obj) => {
                        if (obj && obj.accessToken === accessToken) {
                            next();
                        } else {
                            res.status(403).json({
                                toastType: 4,
                                toastMessage: 'Authorization Error.'
                            });
                        }
                    })
                }
            })
        } else {
            res.status(403).json({
                toastType: 2,
                toastMessage: 'Authorization logout'
            })
        }
    }
    
}

module.exports = checkToken