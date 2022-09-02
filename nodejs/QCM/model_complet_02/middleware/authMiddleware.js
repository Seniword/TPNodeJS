import crypto from "crypto";
import dotenv from "dotenv";
import {UserModel} from "../Models/User.js";

dotenv.config();
const { APP_SECRET: secret } = process.env;

const sha256hasher = crypto.createHmac("sha256", secret)
const sha256hasher2 = crypto.createHmac("sha256", secret)


const authMiddleware = async(req, res, next) => {
    req.session.errorCount = 0
    req.session.message = []
    // check if user name and password are safe
    let regexName = /[A-Za-z]/g;
    let regexEmail = /[A-Za-z0-9@.]/g;
    let regexPassword = /[A-Za-z0-9!?;,.§&#|~{}]/g;

    if(req.body.firstName.match(regexName).length == req.body.firstName.length
        && req.body.firstName.length >= 2){}
    else {
        req.session.message.push("First name is not valid.");
        req.session.errorCount++;
    };

    if(req.body.lastName.match(regexName).length == req.body.lastName.length
        && req.body.lastName.length >= 2){}
    else {
        req.session.message.push("Last name is not valid.");
        req.session.errorCount++;
    };

    if(req.body.email.match(regexEmail).length == req.body.email.length){}
    else {
        req.session.message.push("Email name is not valid.");
        req.session.errorCount++;
    };

    let hashPassword;
    if(req.body.password.match(regexPassword).length == req.body.password.length &&
        req.body.password_confirm == req.body.password && req.body.password.length >= 5)
    {
        hashPassword = sha256hasher.update(req.body.password).digest("hex")
    }
    else{
        req.session.message.push("Passwords do not match or use unauthorized caracters.");
        req.session.errorCount++;
    }

    if(req.session.errorCount > 0)
    {
        res.redirect("/")
        return;
    }

    let user = await UserModel.findOne({email: req.body.email});

    if(user){
        res.redirect("/login")
        return;
    }
    else{
        user = new UserModel({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hashPassword,
        });

        user.save(function (err) {
            if (err) return handleError(err);
        });
        res.redirect("/login")
    };

    next();
};

export default authMiddleware;