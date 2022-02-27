const path = require('path');
const fs = require('fs/promises');
const crypto = require('crypto');
const multer = require('multer');


const memoryStorage = multer.memoryStorage();
const fileFetch = multer({ storage: memoryStorage });


const saveImage = async (image) => {
    const {mimetype, buffer} = image;
    
    const ext = mimetype.split('/')[1];
    const imageName = `${Date.now()}${crypto.randomBytes(20).toString('hex')}.${ext}`;

    // Save the files
    await fs.writeFile(path.resolve(`data/image/small/${imageName}`), buffer);

    return imageName;
}


module.exports = {fileFetch, saveImage};