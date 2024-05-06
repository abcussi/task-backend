const Joi = require("joi");

const validateUser = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required().max(50),
    password: Joi.string().min(6).required().max(50),
    name: Joi.string().alphanum().min(3).max(50),
//    _csrf: Joi.string().required().max(50),
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
    userId: Joi.string().required().max(50),
    title: Joi.string().min(1).max(50),
    description: Joi.string().max(50),
    status: Joi.string().max(50),
    refUserId: Joi.alternatives().try(Joi.string(), Joi.allow(null)).max(50),
    //_csrf: Joi.string().required().max(50),
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
