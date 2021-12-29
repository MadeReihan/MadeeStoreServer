const User = require('./model')
const bcrypt = require('bcryptjs')
module.exports={
    viewSignin: async(req,res) => {
        try{
            const alertMessage = req.flash("alertMessage")
            const alertStatus = req.flash("alertStatus")

            const alert = {message:alertMessage, status:alertStatus}
            if(req.session.user === null || req.session.user == undefined){
                res.render('admin/users/view_signin',{
                    alert,
                    title:'Halaman Login'
                })
            }else{
                res.redirect('/dashboard')
            }

        }catch(err){
            req.flash('alertMessage',`${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/')
        }
    },
    actionSignin:async(req,res)=>{
        try {
            const {email,password} = req.body
            const check = await User.findOne({email:email})
            if(check){
                if(check.status === 'Y'){
                    const checkPassword = await bcrypt.compare(password,check.password)
                    if(checkPassword){
                        req.session.user={
                            id:check._id,
                            email:check.email,
                            status:check.status,
                            name:check.name
                        }
                        res.redirect('/dashboard')
                    }else{
                        req.flash('alertMessage',`Data salah sayang`)
                        req.flash('alertStatus', 'danger')
                        res.redirect('/')
                    }
                }else{
                    req.flash('alertMessage',`Data tidak active`)
                    req.flash('alertStatus', 'danger')
                    res.redirect('/')
                }
            }else{
                req.flash('alertMessage',`Data Salah`)
                req.flash('alertStatus', 'danger')
                res.redirect('/')
            }
        } catch (err) {
            req.flash('alertMessage',`${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/')
        }
    },
    logOut:(req,res)=>{
        req.session.destroy();
        res.redirect('/')
    },
    viewListUser:async(req,res)=>{
        try{
            const alertMessage = req.flash("alertMessage")
            const alertStatus = req.flash("alertStatus")

            const alert = {message:alertMessage, status:alertStatus}
            const user = await User.find()
            
            res.render('admin/users/viewListUser',{
                user,
                alert,
                name:req.session.user.name,
                title: 'Halaman user'
            })
        }catch(err){
            req.flash('alertMessage',`${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/userlistview')
        }
    },
    viewCreate:async(req,res)=>{
        try {
            res.render('admin/users/create',{
                name:req.session.user.name,
                title: 'Halaman Tambah User'
            })
        } catch (err) {
            req.flash('alertMessage',`${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/user')
        }
    },
    actionCreate:async(req,res)=>{
        try {
            const {role,email,password,phoneNumber,name} = req.body;
            const salt = await bcrypt.genSalt()

            let user = await User({role,email,password,phoneNumber,name})
            user.password =  await bcrypt.hash(password,salt)
            await user.save();
            console.log(user)
            req.flash('alertMessage', "Berhasil tambah user")
            req.flash('alertStatus', "success")
            
            res.redirect('/listUser')
        } catch (err) {
            req.flash('alertMessage',`${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/listUser')
        }
    }
}