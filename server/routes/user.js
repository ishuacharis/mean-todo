const express = require('express');
const router = express.Router();
const passport = require('passport')
const jwt = require('jsonwebtoken')


const User = require('../models/userModel')
const Todo = require('../models/todoModel')

const { redirectToLogin } = require('../middlewares/middlewares') 
const {
  SESS_NAME
} = process.env

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log(req.session)
  res.status(200).json({
    user: 'page'
  });
});


router.get('/:user', async function (req, res) {
  console.log("my todos")
  const {
    user
  } = req.params
  const filter = {
    create_by: user,
    is_deleted: false
  }
  const exclude = {__v:0}
  const totalTodos = (await Todo.find(filter)).length
 
  Todo.find(filter,exclude)
  .populate({path: 'create_by', select: 'username'})
  .populate({path: 'like_by', select: 'username email'})
  .populate({
    path: 'retweet_by',
    select: 'username email'
  }).
  then(function (docs) {
      return res.status(200).json({
        todos: docs,
        length: docs.length
      })
    }).catch(function (error) {
        return res.status(211).json({
          err: error
        })
      })
})


router.post('/:user', async function (req, res) {
  const {
    user
  } = req.params
  const totalTodos = (await Todo.find()).length + 1
  const {
    title,
    tags,
    desc
  } = req.body
  const newTodo = new Todo({
    id: totalTodos,
    title: title,
    tags: tags,
    desc: desc.trim(),
    is_completed: false,
    create_by: user
  })

  newTodo.save(function (err, todo) {
    if (err) {
      res.status(201).json({
        err: err,
        message: "unable to save todo",
        todo: newTodo
      })
      console.log(err)
    } else {
      Todo.find({
        create_by: user
      }, async function (err, docs) {
        if (err) {
          return res.status(211).json({
            err: err,
            message: "unable to fetch todos",
            todo: newTodo
          })
        }

        return res.status(200).json({
          todos: docs,
          length: docs.length
        })


      })

    }
  })
})


module.exports = router;
