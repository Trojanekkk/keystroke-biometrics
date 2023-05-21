const Joi = require("joi");

exports.textSchema = Joi.object({
  body: Joi.string().required(),

  lang: Joi.string().length(2).required(),

  title: Joi.string().max(50).required(),
});
