const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');


const publicKey = fs.readFileSync(path.resolve('id_ec_pub.pem'), 'utf8');
const privateKey = fs.readFileSync(path.resolve('id_ec_priv.pem'), 'utf8');

// Verify Token
const verifyToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, publicKey, (err, payload) => {
            if(err) {
                reject(err);
            }
            else {
                resolve(payload);
            }
        });
    });
}


// Make a token
const issueToken = (payload, expireTime = '7d') => {
    return new Promise((resolve, reject)=> {
        
        // Sign the payload with the key
        jwt.sign(payload, privateKey, { algorithm: 'ES256', expiresIn: expireTime }, (err, token) => {
            if(err) {
                reject(err);
            }
            else {
                resolve(token);
            }
        });
    });
}

module.exports = {verifyToken, issueToken};