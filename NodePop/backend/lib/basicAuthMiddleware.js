const auth = require('basic-auth');

module.exports = (req,res,next) => {
    const user = auth(req);

    if (!user || user.name !== 'admin' || user.password) {
        res.set('WWW-Authenticate', 'Basic realm=Authorization realm required')
        res.sendStatus(401) // Unauthenticated
    }
    next();
}

