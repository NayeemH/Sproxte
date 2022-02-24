const {generateKeyPairSync} = require('crypto');
const fs = require('fs');



const genKeyPair = () => {
    const keyPair = generateKeyPairSync('ec', {
        namedCurve: 'secp256k1',

        publicKeyEncoding: {
            type: 'spki',
            format: 'pem'
        },

        privateKeyEncoding: {
            type: 'pkcs8',
            format: 'pem'
        }
    });

    fs.writeFileSync('id_ec_priv.pem', keyPair.privateKey, 'utf8');
    fs.writeFileSync('id_ec_pub.pem', keyPair.publicKey, 'utf8');

    
    console.log(`${keyPair.publicKey}\n${keyPair.privateKey}`);
}

genKeyPair();
