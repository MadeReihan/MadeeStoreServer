const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const HASH_ROUND = 10

let playerSchema = mongoose.Schema({
    email:{
        type:String,
        require:[true,"email tidak boleh kosong"]
    },
    name:{
        type:String,
        require:[true,"nama tidak boleh kosong"]
    },
    username:{
        type:String,
        require:[true,"nama tidak boleh kosong"]
    },
    avatar:{
        type:String,
        
    },
    password:{
        type:String,
        require:[true,"password tidak boleh kosong"]
    },
    phoneNumber:{
        type:String,
        require:[true,"nomor HP tidak boleh kosong"]
    },
    role:{
        type:String,
        enum:['admin','user'],
        default:'user'
    },
    status:{
        type:String,
        enum:['Y','N'],
        default:'Y'
    },
    fileName:{
        type:String
    },
    favorite:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category'
    }
    


},{timestamps:true})

playerSchema.path('email').validate(async function(value){
    try {
        const count = await this.model('Player').countDocuments({email:value})

        return !count;
    } catch (err) {
        throw err
    }
}, attr=>`${attr.value} sudah terdaftar`)

playerSchema.pre('save',function(next){
    this.password = bcrypt.hashSync(this.password,HASH_ROUND)
    next()
})

module.exports = mongoose.model('Player', playerSchema)