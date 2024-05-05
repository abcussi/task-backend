const Joi = require("joi");

const validateUser = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    name: Joi.string().min(3),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({
      status: "error",
      message: error.details[0].message,
    });
  }

  next();
};

const validateTask = (req, res, next) => {
  const schema = Joi.object({
    userId: Joi.string().required(),
    title: Joi.string().min(1),
    description: Joi.string(),
    status: Joi.string(),
    refUserId: Joi.alternatives().try(Joi.string(), Joi.allow(null)),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({
      status: "error",
      message: error.details[0].message,
    });
  }

  next();
}

module.exports = {
  validateUser,
  validateTask
};
