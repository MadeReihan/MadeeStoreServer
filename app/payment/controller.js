const Payment = require('./model')
const Banks = require('../bank/model')
module.exports={
    index: async(req,res) => {
        try{
            const alertMessage = req.flash("alertMessage")
            const alertStatus = req.flash("alertStatus")

            const alert = {message:alertMessage, status:alertStatus}
            const payment = await Payment.find().populate('banks')
            
            res.render('admin/payment/view_payment',{
                payment,
                alert,
                name:req.session.user.name,
                title: 'Halaman Payment'
            })
        }catch(err){
            req.flash('alertMessage',`${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/payment')
        }
    },
    viewCreate:async(req,res) => {
        try {
            const banks = await Banks.find()
            res.render('admin/payment/create',{banks,name:req.session.user.name,
                title: 'Halaman Tambah Payment'})
        } catch (err) {
            req.flash('alertMessage',`${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/payment')
        }
    },

    actionCreate:async(req,res)=>{
        try {
            const {type,banks} = req.body;
            let payment = await Payment({type,banks})
            await payment.save();

            req.flash('alertMessage', "Berhasil tambah payment")
            req.flash('alertStatus', "success")
            
            res.redirect('/payment')
        } catch (err) {
            req.flash('alertMessage',`${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/payment')
        }
    },

    viewEdit:async(req,res) => {
        try {
            const{id} = req.params
            const payment = await Payment.findOne({_id:id}).populate('banks')
            const banks = await Banks.find()
            res.render('admin/payment/edit',{payment,banks,name:req.session.user.name,
                title: 'Halaman Edit Payment'})
        } catch (err) {
            req.flash('alertMessage',`${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/payment')
        }
    },

    ActionEdit: async(req,res)=>{
        try {
            const {id} = req.params
            const {type,banks} = req.body
            const payment = await Payment.findOneAndUpdate({
                _id:id
            },{type,banks});
            req.flash('alertMessage', "Berhasil edit payment")
            req.flash('alertStatus', "success")
            
            res.redirect('/payment');
        } catch (err) {
            req.flash('alertMessage',`${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/payment')
        }
    },

    ActionDelete:async(req,res)=>{
        try {
            const{id} = req.params;
            const payment = await Payment.findOneAndRemove({
                _id:id
            });
            req.flash('alertMessage', "Berhasil hapus payment")
            req.flash('alertStatus', "success")
            
            res.redirect('/payment')
        } catch (err) {
            req.flash('alertMessage',`${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/payment')
        }
    }
}