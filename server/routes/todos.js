const express  = require('express')
const router  = express.Router()
const Todo = require('../models/todoModel')
const User = require('../models/userModel')

router.get('/',  function(req,res) {
    const filter = {}
    const exclude = {__v: 0}
    Todo.find(filter,exclude)
    .populate({path: 'create_by', select: 'username'})
    .populate({path: 'like_by', select: 'username email'}).
    then(function (docs){
        
        return res.status(200).json({
            todos: docs,
            length: docs.length
        })
    }).catch(function (error) {
        res.status(211).json({
            err: error
        })
    })
   console.log("angular sending request")
})

router.get('/:id', function(req, res) {
    const {id} = req.params
    const filter = {
        _id: id
    }
    const exclude = {
        __v: 0
    }
    
    Todo.findOne(filter, exclude)
    .populate({path: 'create_by', select: 'username'})
    .then(function (doc){
        return res.status(200).json({
            todo: doc,
            message: "Todo retrived successfully"
        })
    })
    .catch(function(error){
        return res.status(500).json({
            err: error,
            message: "Todo not found"
        })
    })
})

router.put('/:id', function(req, res) {
    const {id} = req.params
    const filter  = {_id: id}
    const {title,tags, desc, created_date, is_completed, like_by} = req.body
    const updatedTodo = {
        title: title,
        tags: tags,
        desc: desc,
        created_date: created_date,
        is_completed: !is_completed,
        like_by: like_by
    }
 
    Todo.findOneAndUpdate(filter, updatedTodo, 
        {new: true,useFindAndModify: false},
        function(err, doc){
        if (err) {
            return res.status(211).json({
                err: err,
                todo: updatedTodo,
                message: "Unable to update todo"
            })
        }

        return res.status(200).json({
            todo: doc,
            message: "Todo updated successfully"
        })
    })
})

router.delete('/:id', function(req, res) {
    console.log("delete route")
    const {id} = req.params
   
    const filter = {_id:id}

    const isDeleted  = {is_deleted: true}
    Todo.findOneAndUpdate(filter, isDeleted, {
            new: true,
            useFindAndModify: false
        },
        function (err, doc) {
            if (err) {
                return res.status(211).json({
                    err: err,
                    message: "Unable to deleted todo"
                })
            }
            return res.status(200).json({
                todo: doc,
                message: "Todo deleted successfully"
            })
        })
    /*Todo.deleteOne(filter, async function(err,doc) {
        if (err){
            res.status(211).json({
                err: err,
                message: "Unable to delete todo"
            })
        }
        const todosLeft = (await Todo.find()).length
        res.status(202).json({
            total_todos: todosLeft,
            message: "Todo deleted successfully"
        })
    })*/
})


module.exports = router