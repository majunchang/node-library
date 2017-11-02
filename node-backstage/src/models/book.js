import mongoose from 'mongoose'

const bookSchema = mongoose.Schema({
    bookName: String,
    authorName:String,
    publishHouse:String,
    date:  Date,
    priceNum:Number,
    bookCount:Number,
    category:String,
    desc:String
})

const book = mongoose.model('book',bookSchema);

export default  book;