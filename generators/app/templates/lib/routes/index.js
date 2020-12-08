const router = require('express').Router();

router.use('/v1.0', require('./v1.0'));

router.route('/status').get((req, res) => {
  res.status(200).send();
});
router.all('*', function(req, res) {
  res.status(404).send({ message: '** no hunicorns here**' });
});

module.exports = router;
