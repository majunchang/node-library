import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    name: String,
    password: String,
    mail:String,
})

const user = mongoose.model('user',userSchema);

export default  user;