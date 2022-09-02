import sha256 from 'crypto-js/sha256.js';
import hmacSHA512 from 'crypto-js/hmac-sha512.js';
import Base64 from 'crypto-js/enc-base64.js';

import dotenv from "dotenv";

dotenv.config();

const authMiddleware = (req, res, next) => {
    // check if user name and password are safe
    let regex = /[A-Za-z0-9!?;,.§&#|~{}]/g;
    if(req.body.name[1].match(regex) != null){}
    else {res.redirect("/")};

    if(req.body.name[2].match(regex) != null){
        const privateKey = "sessionSecret";  // ...
        const hashDigest = sha256(req.body.name[2]);
        const hmacDigest = Base64.stringify(hmacSHA512(hashDigest, privateKey));
    }
    else {res.redirect("/")};

    req.session.name = req.body.name[1];

    next();
};

export default authMiddleware
