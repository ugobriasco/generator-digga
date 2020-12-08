const router = require('express').Router();

router.route('/status').get((req, res) => {
  res.status(200).send();
});

module.exports = router;
