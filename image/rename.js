const fs = require('fs')

fs.readdir('.', (err, files) => {
    let one = 0,
        noOne = 0;
    files.forEach(file => {

        if (file.includes('1-')) {
            one += 1
                // let name = file.split('-')[0];
                // if (!name.includes('.jpg') && !name.includes('.png') && !name.includes('.jpeg')) {
                //     let newName = `1-${name}.jpeg`
                //     console.log(newName)
                //     fs.rename(file, newName, err => console.log(err))
                // } else {
                //     let newName = `1-${name}`;
                //     console.log(newName)

            //     fs.rename(file, newName, err => console.log(err))
            // }

        } else {
            noOne += 1
        }
    })
    console.log(one, noOne)
})