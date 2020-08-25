const { pool } = require('../db');

/**
 * Adds a new user to the database
 * @param {object} userDetails - Details of a new user
 */
function createUser(userDetails) {
  const {
    firstname, lastname, email, password,
    gender, jobRole, department, address,
  } = userDetails;
  const queryString = 'INSERT INTO users '
    + '(first_name, last_name, email, password, '
    + 'gender, job_role, department, address) VALUES '
    + '($1, $2, $3, $4, $5, $6, $7, $8)';
  return pool
    .query(queryString, [
      firstname, lastname, email, password,
      gender, jobRole, department, address,
    ])
    .then((result) => result)
    .then((result) => result)
    .catch((err) => err);
}

/**
 * Retrieves a user from the database using an email
 * @param {string} email - User's email
 * @return {Promise} Resolves to a user with the provided email
 */
function findUserByEmail(email) {
  const queryString = 'SELECT * FROM users WHERE email = $1';
  return pool
    .query(queryString, [email])
    .then((result) => result.rows[0])
    .catch((err) => err);
}

module.exports = {
  createUser,
  findUserByEmail,
};
