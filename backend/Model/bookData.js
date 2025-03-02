const mongoose = require('mongoose')
const bookSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter book name"],
        trim:true,
        maxLength:[100,"Book name cannot exceed 100 characters"]
    },
    title:{
        type:String,
        required:[true,"Please enter book title"],
        trim:true,
        maxLength:[150,"Book title cannot exceed 150 characters"]
    },
    description:{
        type:String,
        required:[true,"Please enter book description"],
    },
    price:{
        type:Number,
        required:[true,"Please enter book price"],
        min:[0,"Book price cannot be negative"]
    },
    category:{
        type:String,
        required:[true,"Please enter book category"],
        
    },
    image:{
          type:String,
          required:[true,"Please enter book image URL"],
          match:[/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&\/=]*)/, "Please enter a valid URL for the book image"]
    }
})

const bookData= mongoose.model("BookData",bookSchema)
module.exports=bookData