const bcrypt = require('bcrypt');

const saltRounds = 12;

/**
 * Generates hash from a password
 * @param {string} password - Plain text password
 * @returns {Promise} - Resolves to a hased password if there is no error
 */
function generateHashedPassword(password) {
  return bcrypt.hash(password, saltRounds)
    .then((hash) => hash)
    .catch((err) => err);
};

/**
 * Compares a plain text password with a hashed password
 * @param {string} password - Plain text password
 * @param {string} hash - Hashed password
 * @return {Promise} Resolves to a boolean value if there is no error
 */
function comparePassword(password, hash) {
  return bcrypt.compare(password, hash)
    .then((match) => match)
    .catch((err) => err);
}