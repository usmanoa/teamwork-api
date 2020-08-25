const { Router } = require('express');

const router = Router();

router.get('/create-user', (req, res) => {
  res.send('Create User');
});

module.exports = router;
