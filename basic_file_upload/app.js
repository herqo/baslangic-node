const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');

app.use(bodyParser.json());

const Storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './public/files')
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname + "__" + Date.now() + "_" +file.originalname);
    }
})



var upload_file = multer({
    storage: Storage
}).array('Upload_File', 3)


app.get('/', (req, res) => {
    res.sendfile(__dirname + '/views/index.html');
})


app.post('/file', (req, res)=>{
    upload_file(req, res, (err) => {
        if (err) {
            console.log(err)
            return res.send('Hata')
        } else {

            return res.end('İşlem Tamamlandı')
        }
    })
})


const server = app.listen(3000, () => {
    console.log('App Starting : %d', server.address().port);
})