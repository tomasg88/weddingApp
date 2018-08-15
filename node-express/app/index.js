var express = require('express'),
    fs = require('fs'),
    path = require('path'),
    AWS = require('aws-sdk'),
    bodyParser = require('body-parser'),
    multer = require('multer'),
    multerS3 = require('multer-s3'),
    Busboy = require('busboy');

AWS.config.update({
    secretAccessKey: 'NtMti+9/Y/RdEfFDn+L1bBiMBsiCy9aGOepq5FdX',
    accessKeyId: 'AKIAIDDLAOZU4DRK2MOQ'
});

var app = express(),
    s3 = new AWS.S3();

app.use(bodyParser.json());

//--------------------------
// ROUTES
//--------------------------
app.get('/', function (req, res) {
    console.log('Root!');
    res.sendFile(__dirname + '/index.html');
});

app.get('/images', function(req, res) {
    s3.getObject({
        Bucket: 'wedding-image-bucket', // your s3 bucket name
        Key: 'sample.png'
    }, function(err) {
        if (err) {
            console.log(err, err.stack); // an error occurred
        }
        else {
            console.log(data);           // successful response
            res.send(data)
        }
    });

});

app.post("/upload", (req, res) => {
    let chunks = [], fname, ftype, fEncoding;
    let busboy = new Busboy({ headers: req.headers });
    busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
        console.log('File [' + fieldname + ']: filename: ' + filename + ', encoding: ' + encoding + ', mimetype: ' + mimetype);
        fname = filename.replace(/ /g,"_");
        ftype = mimetype;
        fEncoding = encoding;
        file.on('data', function(data) {
            // you will get chunks here will pull all chunk to an array and later concat it.
            console.log (chunks.length);
            chunks.push(data)
        });
        file.on('end', function() {
            console.log('File [' + filename + '] Finished');
        });
    });
    busboy.on('finish', function() {
        const params = {
            Bucket: 'wedding-image-bucket', // your s3 bucket name
            Key: `${fname}`,
            Body: Buffer.concat(chunks), // concatinating all chunks
            ACL: 'public-read',
            ContentEncoding: fEncoding, // optional
            ContentType: ftype // required
        }
        // we are sending buffer data to s3.
        s3.upload(params, (err, s3res) => {
            if (err){
              res.send({err, status: 'error'});
            } else {
              res.send({data:s3res, status: 'success', msg: 'Image successfully uploaded.'});
            }
        });

    });
    req.pipe(busboy);
});


//--------------------------
// EXECUTE SERVER
//--------------------------
app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
