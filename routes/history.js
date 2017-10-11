const router = require('express').Router();

router.get('/history', (req, res) => {
  res.render('history');
});

module.exports = router;
