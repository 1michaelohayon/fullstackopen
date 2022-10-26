const express = require('express');
const { Todo } = require('../mongo')
const router = express.Router();
const redis = require('../redis')

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos);
});


router.get('/:id', async (request, response) => {
  const todoItem = await Todo.findById(request.params.id)
  todoItem
  ? response.json(todoItem)
  : response.status(404).end()
});

/* PUT to todos listing */
router.put('/:id', async (request, response) => {
  const { done} = request.body
  
  
  const updatedTodo = await Todo.findByIdAndUpdate(
    request.params.id,
    { done},
    { new: true, runValidators: true, context: 'query' }
    )
    response.json(updatedTodo.toJSON())
    
  })
  
  

  /* POST todo to listing. */
  router.post('/', async (req, res) => {
    const todo = await Todo.create({
      text: req.body.text,
      done: false
    })
    res.send(todo);
    await redis.incrAsync('addedTodos')

  });
  
  

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()  
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  res.sendStatus(405); // Implement this
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  res.sendStatus(405); // Implement this
});

router.use('/:id', findByIdMiddleware, singleRouter)


module.exports = router;
