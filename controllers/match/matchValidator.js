const joi = require('joi');

const idSchema = joi.string().alphanum().length(24); //TO CHECK : we consider every id is an alphanumerical string 24 caracters long

const matchJoiSchema = {
    name: joi.string(),
    status: joi.string().valid(['finished', 'waitingConfirmation', 'confirmed', 'canceled']),  //between [finished, waitingConfirmation, confirmed, canceled]
    league1Id: idSchema,
    league2Id: idSchema,
    league1Members: joi.array().items(idSchema),
    league2Members: joi.array().items(idSchema),
    league1MembersPropositions: joi.array().items(idSchema),
    league2MembersPropositions: joi.array().items(idSchema),
    referee: idSchema,
    mc: idSchema,
    refereePropositions: joi.array().items(idSchema),
    mcPropositions: joi.array().items(idSchema),
    admins: joi.array().items(idSchema),
    subscribers: joi.array().items(idSchema),
    description: joi.string(),
    date: joi.date(),
    location: joi.string(),
    score: joi.object().keys({
        score1: joi.number().integer(),
        score2: joi.number().integer()
    })
}

/**
 * same as joiSchema, but some basic fields are required (minimum info to create match)
 */
const matchJoiSchemaRequired = { //TO DO : is it possible to define only one schema, and say we want to make some fields required after ?
    name: joi.string().required(),
    status: joi.string().valid(['finished', 'waitingConfirmation', 'confirmed', 'canceled']),  //between [finished, waitingConfirmation, confirmed, canceled]
    league1Id: idSchema.required(),
    league2Id: idSchema.required(),
    league1Members: joi.array().items(idSchema),
    league2Members: joi.array().items(idSchema),
    league1MembersPropositions: joi.array().items(idSchema),
    league2MembersPropositions: joi.array().items(idSchema),
    referee: idSchema,
    mc: idSchema,
    refereePropositions: joi.array().items(idSchema),
    mcPropositions: joi.array().items(idSchema),
    admins: joi.array().items(idSchema),
    subscribers: joi.array().items(idSchema),
    description: joi.string(),
    date: joi.date().required(),
    location: joi.string().required(),
    score: joi.object().keys({
        score1: joi.number().integer(),
        score2: joi.number().integer()
    })
}

/**
 * returns a promise : resolved iif match corresponds to matchJoiSchema
 * @param {match Object} match
 * @param {boolean} required - true if some fields are required
 */
function validate(match, required){
    return (required ? joi.validate(match, matchJoiSchemaRequired) : joi.validate(match, matchJoiSchema));
}

exports.validate = validate;

