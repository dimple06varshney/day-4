const Profile = require('../models/profile.model');
const express = require('express');
const router = express.Router();
router.get('/',  (req,res)=>{
    res.render('profile',{title: 'Profile Page'})
})
router.post('/', async (req, res)=>{
    try{
        let userDOB = req.body.date_of_birth;
       dd = userDOB.split('-')[2]
       mm = userDOB.split('-')[1]
       userDOB = dd +"-"+ mm;
       console.log('13',userDOB);
       const profile = await Profile.create({
           first_name: req.body.first_name,
           last_name: req.body.last_name,
           address: req.body.address,
           date_of_birth: userDOB,
           phone: req.body.phone
       });
       console.log('profile',profile);
      return res.render("profile",{message: 'Profile successfully created!'}) 
    }
    catch(err){
        console.log("Error: ",err);
    }
})
router.get('/birthday',  (req,res)=>{
    res.render('birthday',{title: 'Birthday Page'})
})
router.post('/birthday', async (req,res)=>{
    try{
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        today = dd +'-'+mm; 
       const checkdob = await Profile.findOne({$and: [{first_name: req.body.first_name}, {last_name: req.body.last_name}]}).lean().exec();
       if(!checkdob) return res.render('birthday', {message: 'User not exist'})
       let userDOB = checkdob.date_of_birth;
       console.log(userDOB, today, today===userDOB);  
       if(today===userDOB) return res.render('birthday',{message:'Happy Birthday!'})
       else return res.render('birthday',{message: 'No today is not your birthday!'})
    }
    catch(err){
        console.log("Error:",err);
    }
})

// All users who are having birthday today
router.get('/celebrants', async (req,res)=>{
    try{
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0');
        today = dd +'-'+mm; 
        const celebrants =await Profile.find({date_of_birth: today}).lean().exec()
        console.log(celebrants);
        return res.send(celebrants)
    }
    catch(err){
        console.log("err:", err);
    }
})

// iii. Create a virtual property which will return full name ie first name + last name of the user
router.get('/fullname', async(req,res)=>{
    try{
       let users = await Profile.find(); 
       console.log(users);
       let names = []
       for(let i=0;i< users.length; i++){
         let fullname = users[i].first_name+ " "+users[i].last_name;
         names.push(fullname)
       }
    //    console.log(names);
       return res.send(names)
    }
    catch(err){
        console.log(err);
    }
})
module.exports = router;