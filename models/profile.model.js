const mongoose = require('mongoose');
const profileSchema = new mongoose.Schema({
    first_name: {type:String, required:true},
    last_name: {type:String, required:true},
    address: {type:String, required:true},
    date_of_birth: {type:String, required:true},
    phone: {type:Number, required:true}
},{
    timestamps:true,
    versionKey:false
})
module.exports = mongoose.model('profile', profileSchema);
