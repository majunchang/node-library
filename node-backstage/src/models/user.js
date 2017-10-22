import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    name: String,
    password: String,
})

const user = mongoose.model('user',userSchema);

export default  user;