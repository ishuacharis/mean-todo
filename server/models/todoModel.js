const mongoose = require('mongoose')
const  Schema  = mongoose.Schema
const User  = require('./userModel')

const todoSchema = new Schema({
    id: {type: Number, required: true, unique: true},
    title: {type: String, required: true,},
    tags: [],
    desc: {
        type: String, required: true
    },
    created_date: {
        type: Date, 
        default: Date.now()
    },
    updated_date: {
        type: Date,
        default: Date.now()
    }, 
    is_completed: Boolean,
    create_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    is_deleted: {
            type: Boolean,
            default: false
    },
    like_by: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    }],
    retweet_by: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],

})
todoSchema.pre('save' , function(next) {
    const currentDate  = new Date()

    this.created_date = currentDate
    if (!this.created_date) {
        this.created_date = currentDate
    }
    if (!this.updated_date) {
        this.updated_date = currentDate
    }
    next()
})
const Todo =  mongoose.model('Todo', todoSchema)

module.exports = Todo