function getImages(req, res) {
    Image.find({},
    function (err, images) {
        if (err) {
            res.status(500).json({
                text: "Erreur interne"
            })
        } else if (!images) {
            res.status(401).json({
                text: "Aucun utilisateur trouvé"
            })
        } else {
            //console.log("logged in with " + user)
            res.status(200).json({
                images: images,
                text: "Authentification réussi"
            })
        }
    })
}


function getImageById(req, res) {
    try {
        _id = req.params.id
    } catch (err) {
        res.status(400).json({
            text: "invalid request"
        })
    }
    var query = Image.findOne({_id:_id});
    query.exec(function(err, image){
        if (err) {
            res.status(500).json({
                text: "Erreur interne"
            })
        }
        else {
        res.status(200).json({ 
            image : image
        })
        }
    })
}

exports.getImages = getImages;
exports.getImageById = getImageById;