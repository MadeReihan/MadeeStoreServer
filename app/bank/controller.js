const Bank = require('./model')
module.exports={
    index: async(req,res) => {
        try{
            const alertMessage = req.flash("alertMessage")
            const alertStatus = req.flash("alertStatus")

            const alert = {message:alertMessage, status:alertStatus}
            const bank = await Bank.find()
            
            res.render('admin/bank/view_bank',{
                bank,
                alert,
                name:req.session.user.name,
                title: 'Halaman Bank'
            })
        }catch(err){
            req.flash('alertMessage',`${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/bank')
        }
    },
    viewCreate:async(req,res) => {
        try {
            res.render('admin/bank/create',{
                name:req.session.user.name,
                title: 'Halaman Tambah Bank'
            })
        } catch (err) {
            req.flash('alertMessage',`${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/bank')
        }
    },

    actionCreate:async(req,res)=>{
        try {
            const {name,namaBank,nomorRekening} = req.body;
            let bank = await Bank({name,namaBank,nomorRekening})
            await bank.save();

            req.flash('alertMessage', "Berhasil tambah bank")
            req.flash('alertStatus', "success")
            
            res.redirect('/bank')
        } catch (err) {
            req.flash('alertMessage',`${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/bank')
        }
    },

    viewEdit:async(req,res) => {
        try {
            const{id} = req.params
            const bank = await Bank.findOne({_id:id})
            res.render('admin/bank/edit',{bank,name:req.session.user.name,
                title: 'Halaman Edit Bank'})
            // console.log(bank)
        } catch (err) {
            req.flash('alertMessage',`${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/bank')
        }
    },

    ActionEdit: async(req,res)=>{
        try {
            const {id} = req.params
            const {nama,namaBank,nomorRekening} = req.body
            const bank = await Bank.findOneAndUpdate({
                _id:id
            },{nama,namaBank,nomorRekening});
            req.flash('alertMessage', "Berhasil edit bank")
            req.flash('alertStatus', "success")
            
            res.redirect('/bank');
        } catch (err) {
            req.flash('alertMessage',`${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/bank')
        }
    },

    ActionDelete:async(req,res)=>{
        try {
            const{id} = req.params;
            const bank = await Bank.findOneAndRemove({
                _id:id
            });
            req.flash('alertMessage', "Berhasil hapus bank")
            req.flash('alertStatus', "success")
            
            res.redirect('/bank')
        } catch (err) {
            req.flash('alertMessage',`${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/bank')
        }
    }
}