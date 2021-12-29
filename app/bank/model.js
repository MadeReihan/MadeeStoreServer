const mongoose = require('mongoose')

let bankSchema = mongoose.Schema({
    name:{
        type:String,
        require:[true,"nama pemilik tidak boleh kosong"]
    },
    bankName:{
        type:String,
        require:[true,"nama bank tidak boleh kosong"]
    },
    noRekening:{
        type:String,
        require:[true,"nomor rekening bank tidak boleh kosong"]
    },


},{timestamps:true})

module.exports = mongoose.model('Bank', bankSchema)