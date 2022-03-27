const express = require('express')
const app = express()
const port = 3000
const cors = require('cors')
const multer = require('multer')
const { hash } = require('node-image-hash');
const imageHash = require('node-image-hash');
var Jimp = require("jimp");
var Buffer=require("buffer");
var compare=require("hamming-distance");
var img1;
var img2;
arr=[];

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
})

const upload = multer({ storage: storage })

app.use(cors())

app.post('/image', upload.single('file'), function (req, res) {
  res.json({})
})

imageHash
  .hash('SanjanaS.jpg', 8, 'binary')
  .then((hash1) => {
    //console.log(hash1);
    arr[0]=hash1.hash;
    //console.log(arr[0]);

    imageHash.hash('ethereumsynopsis.png', 8, 'binary').then((hash2) => {
      img2=hash2.hash;
       console.log(img2);
      arr[1]=hash2.hash;
      console.log(arr[0]);
     JSON.stringify(arr[0]);
     JSON.stringify(arr[1]);
      var d=compare(arr[0], arr[1]);
      console.log(d);
  
    });
 
 });


var fileName = 'ethereumsynopsis.png';
var imageCaption = 'Image caption';
var loadedImage;

Jimp.read(fileName)
    .then(function (image) {
        loadedImage = image;
        return Jimp.loadFont(Jimp.FONT_SANS_16_BLACK);
    })
    .then(function (font) {
        loadedImage.print(font, 10, 10, imageCaption)
                   .write(fileName);
    })
    .catch(function (err) {
        console.error(err);
    });

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
})

