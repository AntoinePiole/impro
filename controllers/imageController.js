var express = require('express');
var router = express.Router();
var multer = require('multer');

var storage = multer.diskStorage({
    desination : function(req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function(req, file, cb){
        cb(null, file.fieldname + '-' + Date.now() + '.jpg')
    }
});

var upload = multer({ storage: storage }).single('profileImage');

router.post('/', function(req, res) {
    upload(req, req, function(err) {
        if (err) {
            res.status(500).json({
                text: "Erreur interne en essayant de créer la ligue"
            })
        }
        console.log("Successfully uploaded")
        res.status(200).json({
            success: true,
            message : "Image uploaded"
        })
    })
});

module.exports = router;