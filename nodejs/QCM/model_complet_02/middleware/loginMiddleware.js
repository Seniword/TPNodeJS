const loginMiddleware = async(req, res, next) => {
    if(req.session.access)
        next();
    else
        res.redirect("/login")
};

export default loginMiddleware;