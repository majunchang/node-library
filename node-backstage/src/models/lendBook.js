import mongoose from 'mongoose'


/*
    需要的数据信息
    书名 借阅人 借阅学号（作为唯一标识） 借阅时间 还书时间
    书籍的定价（如果借阅人丢失或者损坏 都需要赔偿）
     延期的次数   每个用户 应该有几次 或者两次
 */

const lendBookSchema = mongoose.Schema({
    bookName:String,
    userName:String,
    lendDate:Date,
    ShouldReturnDate:Date,
    bookPrice:Number,
    reNewTimes:Number,
    category:String
})

const lendBook  = mongoose.model('lendBook',lendBookSchema);

export default lendBook;