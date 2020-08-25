const { Router } = require('express');
const { authController } = require('../../contollers');
const { verifyUser, verifyAdmin } = require('../../middlewares');

const router = Router();

router.post('/create-user', verifyUser, verifyAdmin, authController.createUserAccount);

module.exports = router;
