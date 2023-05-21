const Joi = require("joi");

const resultSchemaValidation = (data) => {
  const schema = Joi.object({
    userAgent: Joi.string().max(1000).required(),

    userData: Joi.object({
      nickname: Joi.string().max(500).required(),

      email: Joi.string().email(),

      nativeLanguage: Joi.string().length(2).required(),

      skill: Joi.number().max(10).min(-10).required(),

      frequency: Joi.number().max(20).min(0).required(),
    }),

    results: Joi.array().items(
      Joi.object({
        text: Joi.string().max(5000).required(),

        keydowns: Joi.array().max(5000).required(),

        keyups: Joi.array().max(5000).required(),
      })
    ),
  });

  return schema.validate(data);
};

module.exports = { resultSchemaValidation };
