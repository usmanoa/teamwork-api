/**
 * Checks if a user has been authenticated
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @param {object} next - The next object
 */
function verifyUser(req, res, next) {
  if (req.user) {
    next();
  } else {
    res.status(401).json({
      status: 'error',
      error: 'User is not logged in',
    });
  }
};

module.exports = verifyUser;
