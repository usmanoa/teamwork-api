const { userService } = require('../services');
const { authHelper } = require('../utils');

/**
 * Removes password from user's data
 * @param {object} data - User's data
 * @return {object} - User's data without password
 */
function removePassword(data) {
  const { password, ...others } = data;
  return others;
}

/**
 * Creates a new user account
 * @param {object} req - The request object
 * @param {object} res - The reponse object
 * @param {object} next - The next object
 */
async function createUserAccount(req, res, next) {
  const { email, password, ...otherData } = req.body;

  try {
    const user = await userService.findUserByEmail(email);
    if (user) {
      return res.status(409).json({
        status: 'error',
        error: 'An account with that email exists',
      });
    }

    const hashedPassword = await authHelper.generateHashedPassword(password);
    let createdUser = await userService.addUser({
      email,
      password: hashedPassword,
      ...otherData,
    });
    createdUser = removePassword(createdUser);
    return res.status(201).json({
      status: 'success',
      data: {
        message: 'User account successfully created',
        ...createdUser,
      },
    });
  } catch (err) {
    return next(err);
  }
}

module.exports = {
  createUserAccount,
};
