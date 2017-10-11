const router = require('express').Router();

router.get('/', (req, res) => {
  const name = req.cookies.name;
  if (!name) {
    res.redirect('/formsubmit');
  } else {
    res.render('index', { name });
  }
})

module.exports = router;
