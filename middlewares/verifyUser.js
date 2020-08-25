const { Router } = require('express');

const router = Router();

router.use((req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.status(401).json({
      status: 'error',
      error: 'User is not logged in',
    });
  }
});

module.exports = router;
