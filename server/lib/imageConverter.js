const path = require('path');
const fs = require('fs/promises');
const crypto = require('crypto');
const multer = require('multer');


const memoryStorage = multer.memoryStorage();
const fileFetch = multer({ storage: memoryStorage });


const saveImage = async (image) => {
    const {mimetype, buffer} = image;
    
    // let ext = mimetype.split('/')[1];
    // if(ext === 'svg+xml') ext = 'svg';

    const splitNames = image.originalname.split('.');
    const ext = splitNames[splitNames.length - 1];

    const imageName = `${Date.now()}${crypto.randomBytes(20).toString('hex')}.${ext}`;

    // Save the files
    await fs.writeFile(path.resolve(`data/image/small/${imageName}`), buffer);

    return imageName;
}

const deleteImage = async (imageName) => {
    try {
        await fs.unlink(path.resolve(`data/image/small/${imageName}`));
    }
    catch(error) {
        console.log("Can't delete this file");
    }
}


module.exports = {fileFetch, saveImage, deleteImage};