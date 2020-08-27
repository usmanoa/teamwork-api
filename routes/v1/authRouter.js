const { Router } = require('express');
const { authController } = require('../../contollers');
const { validate, verifyUser, verifyAdmin } = require('../../middlewares');

const router = Router();

router
  .post('/create-user', verifyUser, verifyAdmin,
    validate('createUser'), authController.createUserAccount);

module.exports = router;
