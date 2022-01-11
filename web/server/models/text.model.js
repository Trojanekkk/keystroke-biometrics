const Joi = require('joi')

exports.textSchema = Joi.object({
  body: Joi.string()
    .required(),

  lang: Joi.string()
    .max(2)
    .min(2)
    .required()
})