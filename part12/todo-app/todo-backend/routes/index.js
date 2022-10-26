const express = require('express');
const router = express.Router();
const redis = require('../redis')
const configs = require('../util/config')

let visits = 0


/* GET index data. */
router.get('/', async (req, res) => {
  visits++
  res.send({
    ...configs,
    visits
  });
});

router.get('/statistics', async (req, res) => {
  const statistics = await redis.getAsync('addedTodos');
  const addedTodos = statistics ? statistics : 0
  res.send({
    added_todos: addedTodos
  });
});


module.exports = router;
