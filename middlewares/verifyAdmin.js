/**
 * Checks if a user is an admin
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @param {object} next - The next object
 */
function verifyAmin(req, res, next) {
  if (req.user && req.user.jobRole === 'admin') {
    next();
  } else {
    res.status(401).json({
      status: 'error',
      error: 'You are not authorized to perform this operation',
    });
  }
}

module.exports = verifyAmin;
