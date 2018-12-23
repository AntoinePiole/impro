var express = require('express');
var router = express.Router();
var multer = require('multer');

var storage = multer.diskStorage({
    destination : function(req, file, cb) {
        cb(null, 'public/uploads/')
    },
    filename: function(req, file, cb){
        cb(null, file.fieldname + '-' + Date.now() + '.jpg')
    }
});

var upload = multer({ storage: storage }).single('profileImage');

router.post('/', upload, 
    (req, res) => {
        console.log(req.file)
        res.json({ //Par défaut, statut = 200
            success: true,
            filename : req.file.filename,
            message : "Image uploaded"
        })
    }, 
    (err, req, res, next) => {
    }
)

module.exports = router;