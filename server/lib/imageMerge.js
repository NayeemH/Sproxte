const sizeOf = require('image-size');
const { createCanvas, loadImage } = require('canvas')
const {saveImage} = require('./imageConverter');


const FinalImage = async (parentBuffer, childBuffer, top = 0, width) => {

    const {width: parentWidth, height: parentHeight} = sizeOf(parentBuffer);
    const {width: childWidth, height: childHeight} = sizeOf(childBuffer);

    const canvas = createCanvas(parentWidth, parentHeight);
    const ctx = canvas.getContext('2d');

    
    const parentImage = await loadImage(parentBuffer);
    const childImage = await loadImage(childBuffer);

    let w = parentWidth * 0.3;
    if(width) {
        w = width;
    }
    const h = (childHeight / childWidth) * w;

    ctx.drawImage(parentImage, 0, 0);
    ctx.drawImage(childImage, 
        0, 0, childWidth, childHeight,
        (parentWidth - w) / 2, top, w, h
        );


    const imageName = await saveImage({buffer: canvas.toBuffer(), mimetype: 'image/jpeg'});

    return imageName;
}

module.exports = FinalImage;