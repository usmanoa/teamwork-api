const { check, validationResult } = require('express-validator');

/**
 *  Checks the request body for required fields
 * @param {string[]} fields - Array of field to check
 */
function isFieldMissing(fields) {
  return (req, res, next) => {
    if (!Array.isArray(fields)) {
      return next();
    }
    const errors = [];
    fields.forEach((data) => {
      if (!req.body[data]) {
        errors.push({
          nessage: `${data} is mising. ${data} is required`,
          param: data,
          location: 'body',
        });
      }
    });

    if (errors.length === 0) {
      next();
    } else {
      res.status(422).json({
        status: 'error',
        error: errors,
      });
    }
  };
}

/**
 * Validates  data in the request body
 * @param {string} params - Fields to validate
 */
function validateData(params) {
  let validations = [];
  switch (params) {
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

/**
 * Handles validation errors in request body
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @param {object} next - The next object
 */
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

const fieldsToCheck = {
  createUser: ['firstName', 'lastName', 'email', 'gender',
    'password', 'jobRole', 'department', 'address'],
};

function validate(params = '') {
  return ([
    isFieldMissing(fieldsToCheck[params]),
    ...validateData(params),
    handleValidationErrors,
  ]);
}

module.exports = validate;
