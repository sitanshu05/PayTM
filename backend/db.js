const mongoose = require("mongoose")

mongoose.connect("mongodb+srv://admin:05feb2002@cluster0.itsi58a.mongodb.net/payTM")

const userSchema = mongoose.Schema({
    username : {
        type : String,
        required : true,
        unique : true,
        minLength : 3,
        maxLength : 30,
        trim : true,
        lowercase : true

    },
    firstName :{
        type : String,
        required : true,
        trim : true,
        maxLength : 50
    },
    lastName: {
        type : String,
        required : true,
        trim : true,
        maxLength : 50
    },
    password : {
        type : String,
        required : true,
        minLength : 6
    }
})

const accountsSchema = mongoose.Schema({
    userId :{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    balance : {
        type : Number,
        required : true   
    }
    }
)

const User = mongoose.model('User',userSchema)
const Account = mongoose.model('Account',accountsSchema)

module.exports = {User,Account}