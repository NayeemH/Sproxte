const sizeOf = require('image-size');
const { createCanvas, loadImage } = require('canvas')
const {saveImage} = require('./imageConverter');


const FinalImage = async (parentBuffer, childBuffer) => {

    // const {width: parentWidth, height: parentHeight} = sizeOf(parentBuffer);
    // const {width: childWidth, height: childHeight} = sizeOf(childBuffer);

    // const canvas = createCanvas(parentWidth, parentHeight);
    // const ctx = canvas.getContext('2d');

    
    // const parentImage = await loadImage(parentBuffer);
    // const childImage = await loadImage(childBuffer);


    // ctx.drawImage(parentImage, 0, 0);
    // ctx.drawImage(childImage, 
    //     0, 0, childWidth, childHeight,
    //     0, 0, parentWidth, parentHeight
    // );


    // const imageName = await saveImage({buffer: canvas.toBuffer(), mimetype: 'image/jpeg'});

    // Only update the image 
    const imageName = await saveImage({buffer: parentBuffer, mimetype: 'image/jpeg'});

    return imageName;
}

module.exports = FinalImage;