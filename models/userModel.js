const mongoose = require('mongoose');
const passwordHash = require('password-hash');
const jwt = require('jwt-simple');
const config = require('../config/config');

var userModel = mongoose.Schema({
	email: {
		type: String,
		lowercase: true,
		trim: true,
		unique: true,
		required: true
	},
	password: {
        type: String,
        required: true
	},
	familyName: {        
		type: String,
        required: true
	},
	firstName: {        
		type: String,
        required: true
	},
	username: {        
		type: String,
        required: false
	},
	birthday: {        
		type: Date,
        required: false
	},
	phone: {        
		type: String,
        required: false
	},
	created_at: {        
		type: Date,
        required: false
	},
	photoId: {        
		type: String,
        required: false
	},
	
},{ timestamps: { createdAt: 'created_at' }})


userModel.methods = {
	authenticate: function (password) {
		return passwordHash.verify(password, this.password);
	},
	getToken: function () {
		return jwt.encode(this, config.secret);
	}
}

module.exports = mongoose.model('User', userModel);
