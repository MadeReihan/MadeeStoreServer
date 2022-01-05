const Customer = require('../player/model')
module.exports={
    index: async(req,res) => {
        try{
            const alertMessage = req.flash("alertMessage")
            const alertStatus = req.flash("alertStatus")

            const alert = {message:alertMessage, status:alertStatus}
            const customer = await Customer.find()
            console.log(customer)
            
            res.render('admin/customer/view_customer',{
                customer,
                alert,
                name:req.session.user.name,
                title: 'Halaman customer'
            })
        }catch(err){
            req.flash('alertMessage',`${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/customer')
        }
    }
}