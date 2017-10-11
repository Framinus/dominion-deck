const router = require('express').Router();

router.get('/formsubmit', (req, res) => {
  res.render('formsubmit');
});

module.exports = router;
