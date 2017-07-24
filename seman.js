/**
 * Created by Afro on 12/13/2016.
 */
var { promisify } = require('util'),
    sizeOf = promisify(require('image-size')),
    tinify = require('tinify'),
    fs = require('fs');

tinify.key = 'JR6wJm9v5x0K4x3s4YhZlP3yypBETkph';
let folder = 'image/';
let dest = 'image/small/'

fs.readdir(dest, (err, files) => {
    console.log(files.length)
        // files.forEach(file => {
        //     if (file.includes('jpeg') || file.includes('jpg') || file.includes('png')) {
        //         sizeOf(`${folder}${file}`)
        //             .then(dimension => {
        //                 let imageHeight = dimension.height,
        //                     imageWidth = dimension.width;
        //                 if (imageHeight === 400 && imageWidth === 400) {
        //                     let fileName = `${folder}${file}`,
        //                         source = tinify.fromFile(fileName),
        //                         resized = source.resize({
        //                             method: 'fit',
        //                             height: 20,
        //                             width: 20
        //                         });
        //                     resized.toFile(`${dest}${file}`);
        //                     console.log(`${dest}${file}`)

    //                 }
    //                 if (imageHeight === 350 && imageWidth === 525) {
    //                     let fileName = `${folder}${file}`,
    //                         source = tinify.fromFile(fileName),
    //                         resized = source.resize({
    //                             method: 'fit',
    //                             height: 13,
    //                             width: 20
    //                         });
    //                     resized.toFile(`${dest}${file}`);
    //                     console.log(`${dest}${file}`)
    //                 }
    //             })
    //     }
    // })
})