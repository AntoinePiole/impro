const joi = require('joi');

const idSchema = joi.string().alphanum().length(24); //TO CHECK : we consider every id is an alphanumerical string 24 caracters long

const membersSchema = joi.array().items(Joi.object({
    is: idSchema,
    isAdmin: joi.boolean()
}))

const leagueJoiSchema = {
    name : joi.string(),
    nickname : joi.string(),
    desc : joi.string(),
    photoId : joi.string(), //The "photoId" is actually a part of the path that lead to the photo, and is thus not an actual _id. This is not a problem
    email : joi.string(),
    members : membersSchema,
    receivedMatchRequestsIds : joi.array().items(joi.string()),
    sentMatchRequestsIds : joi.array().items(joi.string()),
    memberPropositions : joi.array().items(joi.string())
}

/**
 * same as joiSchema, but some basic fields are required (minimum info to create league)
 */
const leagueJoiSchemaRequired = {
    name : joi.string().required(),
    nickname : joi.string(),
    desc : joi.string(),
    photoId : joi.string(), //The "photoId" is actually a part of the path that lead to the photo and is not alphanumerical, and is thus not an actual _id. This is not a problem
    email : joi.string(),
    members : membersSchema,
    receivedMatchRequestsIds : joi.array().items(joi.string()),
    sentMatchRequestsIds : joi.array().items(joi.string()),
    memberPropositions : joi.array().items(joi.string())
}


/**
 * returns a promise : resolved iif league corresponds to leagueJoiSchema
 * @param {league Object} league
 * @param {boolean} required - true if some fields are required
 */
function validate(league, required){
    return (required ? joi.validate(league, leagueJoiSchemaRequired) : joi.validate(league, leagueJoiSchema));
}

function validateId(id){
    return joi.validate(id, idSchema);
}

exports.validate = validate;
exports.validateId = validateId;