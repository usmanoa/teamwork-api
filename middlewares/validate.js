const { check, validationResult } = require('express-validator');

function validateData(method) {
  let validations = [];
  switch (method) {
    case 'createUser':
      validations = [
        check('firstName').trim().isLength({ min: 2 }),
        check('lastName').trim().isLength({ min: 2 }),
        check('email', 'Invalid email').isEmail(),
        check('password', 'Password must be longer than 5 characters').trim().isLength({ min: 5 }),
        check('gender', 'Value can either be Male or Female').isIn(['Male', 'Female']),
        check('jobRole').notEmpty(),
        check('department').notEmpty(),
        check('address').notEmpty(),
      ];
      break;
    default:
      break;
  }
  return validations;
}

function handleValidationErrors(req, res, next) {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    next();
  } else {
    res.status(422).json({
      status: 'error',
      error: errors.array(),
    });
  }
}

function validate(method = '') {
  return [...validateData(method), handleValidationErrors];
}

module.exports = validate;

// validate()()