const { Router } = require('express');

const router = Router();

router.use((req, res, next) => {
  if (req.user.jobRole === 'admin') {
    next();
  } else {
    res.status(401).json({
      status: 'error',
      error: 'You are not authorized to perform this operation',
    });
  }
});

module.exports = router;
