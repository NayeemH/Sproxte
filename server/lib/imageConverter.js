const path = require('path');
const fs = require('fs/promises');
const crypto = require('crypto');
const multer = require('multer');
const sharp = require('sharp');


const formatImage = async (buffer, width, height) => {
    const image = await sharp(buffer)
        .rotate()
        .resize({
            width, 
            height,
            fit: sharp.fit.cover
        })
        .jpeg({ mozjpeg: true })
        .toBuffer();

    return image;
}

const memoryStorage = multer.memoryStorage();
const fileFetch = multer({ storage: memoryStorage });


const saveImage = async (image) => {
    const {buffer} = image;
    
    const imageName = `${Date.now()}${crypto.randomBytes(20).toString('hex')}.jpeg`;

    // Convert Image 
    const smallImage = await formatImage(buffer, 480, 360);
    const biggerImage = await formatImage(buffer, 1920, 1080);

    // Save the files
    await Promise.all([
        fs.writeFile(path.resolve(`data/image/small/${imageName}`), smallImage),
        fs.writeFile(path.resolve(`data/image/big/${imageName}`), biggerImage)
    ]);

    return imageName;
}


module.exports = {fileFetch, saveImage};