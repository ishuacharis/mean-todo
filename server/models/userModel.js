const mongoose  = require('mongoose')
const bcrypt = require('bcrypt-nodejs')
const Schema  = mongoose.Schema

const userSchema  = new Schema({
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    },
    

    
})


userSchema.pre('save' , async function(next) {
    console.log("this is inside pre save")
    const currentDate = new Date()
    const user = this
    const hash = await bcrypt.hashSync(this.password)
    this.password = hash

    this.updated_at  = currentDate

    if (!this.created_at) {
        this.created_at =  currentDate
    }

    next()
})

userSchema.methods.isValidPassword = async function (password) {
    console.log("this is inside isValidpassword")
    const user = this
    const compare  = bcrypt.compareSync(password, user.password)
    return compare

}

const User  = mongoose.model('User', userSchema)
module.exports =  User