const Transactions = require('../transaction/model')
const Category = require('../category/model')
const Player = require('../player/model')
const Voucher = require('../transaction/model')
module.exports={
    index: async(req,res) => {
        try{
            const transactions = await Transactions.countDocuments()
            const voucher = await Voucher.countDocuments()
            const player = await Player.countDocuments()
            const category = await Category.countDocuments()
            res.render('admin/dashboard/view_dashboard',{
                count:{
                    transactions,
                    voucher,
                    category,
                    player,
                },
                name:req.session.user.name,
                title: 'Halaman Dashboard'
            })
        }catch(err){
            console.log(err)
        }
    }
}