import {UserModel} from "../Models/User.js";
import crypto from "crypto";

import dotenv from "dotenv";

dotenv.config();
const { APP_SECRET: secret } = process.env;

export async function accountCreated(req, res){
    res.render("login", {message: req.session.message});
}

export async function login(req, res)
{
    const sha256hasher = crypto.createHmac("sha256", secret)
    req.session.errorCount = 0
    req.session.message = []
    // check if user name and password are safe

    let dbMail = await UserModel.findOne({email: req.body.email});
    if(dbMail){}
    else {
        req.session.message.push("Email is not used for any accounts.");
        req.session.errorCount++;
    };

    try{
        let hashPassword = sha256hasher.update(req.body.password).digest("hex");
        let dbPass = await UserModel.findOne({password: hashPassword});
        if(dbPass){}
        else {
            req.session.message.push("Password is wrong.");
            req.session.errorCount++;
        }
    }
    catch(err){
        console.error(err.message)
    }

    if(req.session.errorCount > 0)
    {
        res.redirect("/login")
        return;
    }
    else
    {
        req.session.access = true;
        res.redirect("/dashboard")
    }
}