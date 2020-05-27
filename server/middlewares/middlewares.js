const wares  = {
    redirectToLogin: function (req, res, next) {
        if (!req.session.userId) {
            res.status(211).json({
                message: "Please you need to login... you will be redirected shortly"
            })
        } else {
            next()
        }
    },
    redirectToHome: function(req,res,next) {
        if (req.session.userId) {
            res.status(211).json({
                message: "you will be redirected to home shortly"
            })
        } else {
            next()
        }
    }
}
module.exports = wares