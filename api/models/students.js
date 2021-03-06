const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const Schema = mongoose.Schema

const studentSchema = new Schema({
    fullName : {
        type : String,
        required : true
    },
    age : {
        type : Number,
        required : true,
        max : [120, 'Are you sure you are older than 120 '],
        min : [10, 'I am pretty sure you are older than 10, right ? ']
    },
    email : {
        type : String,
        trim : true,
        validate(value){
            if(validator.isEmail(value) !== true){
                throw new Error('Please enter a valid email address')
            }
        },
        unique : true
        
    },
    DOB : {
        type : String,
        required : true,
    },
    description : {
        type : String,
        required : true
    },
    courses : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Course'
    },
    password : {
        type : String,
        required : true,
        trim : true,
        validate(value){
            if(value.length <= 6){
                throw new Error('Password too short')
            }
        }
    }, 
    picture : {
        type : Buffer
    },
    token :{
        type : String
    }}, {
       timeStamps : true 
    }    
)

studentSchema.methods.generateToken = async function(){
    student = this 

    const token = jwt.sign({
        id : student.id,
        email : student.email
    }, 'PRIVATE_KEY', {
        expiresIn : '3h'
    })
    console.log(token)

    student.token = token

    return token

    
}
const Student = module.exports = mongoose.model('Student', studentSchema)