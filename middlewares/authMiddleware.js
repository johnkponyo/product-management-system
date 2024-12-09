const jwt = require('jsonwebtoken')

const isAuthenticated = (req, res, next) => {
    const token = req.session.token

    if(!token){
        return res.status(403).render('auth/login', {title: 'Login', errMsg: 'Authentication failed!'})
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if(err){
            return res.status(403).render('auth/login', {title: 'Login', errMsg: 'Authentication failed!'})
        }

        req.user = decoded
        // console.log(req.user)
        next()
    })

}

module.exports = isAuthenticated