const mongoose = require('mongoose')

let TransactionSchema = mongoose.Schema({
    historyVoucherTopup:{
        gameName:{
            type:String,
            require:[true,'game name tidak boleh kosong']
        },
        category:{
            type:String,
            require:[true,'category tidak boleh kosong']
        },
        thumbnail:{
            type:String,
        },
        coinName:{
            type:String,
            require:[true,'coinName tidak boleh kosong']
        },
        coinQuantity:{
            type:String,
            require:[true,'quantity tidak boleh kosong']
        },
        price:{
            type:Number,
        },

    },
    historyPayment:{
        name:{
            type:String,
            require:[true,'name tidak boleh kosong']
        },
        type:{
            type:String,
            require:[true,'type tidak boleh kosong']
        },
        bankName:{
            type:String,
            require:[true,'nama Bank tidak boleh kosong']
        },
        noRekening:{
            type:String,
            require:[true,'nomor Rekening tidak boleh kosong']
        },
    },
    name:{
        type:String,
        require:[true,"name pembayaran tidak boleh kosong"],
        maxlength:[225,"batas panjang nama"],
        minlength:[3,"batas panjang nama"]
    },
    accountUser:{
        type:String,
        require:[true,"name akun tidak boleh kosong"],
        maxlength:[225,"batas panjang nama"],
        minlength:[3,"batas panjang nama"]
    },
    tax:{
        type:Number,
        default:0,
    },
    value:{
        type:Number,
        default:0,
    },
    status:{
        type:String,
        enum:['pending','success','failed'],
        default:'pending'
    },
    player:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Player'
    },
    historyUser:{
        name:{
            type:String,
            require:[true,'name player tidak boleh kosong']
        },
        phoneNumber:{
            type:Number,
            require:[true,"name akun tidak boleh kosong"],
            maxlength:[13,"batas panjang nama"],
            minlength:[9,"batas panjang nama"]
        }
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    category:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category'
    }],


},{timestamps:true})

module.exports = mongoose.model('Transaction', TransactionSchema)