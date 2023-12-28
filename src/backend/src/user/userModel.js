var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({

    name: {
        type: String,
        required: true,
    unique:false
    },
    room: {
        type: String,
        required: true , 
        unique:false
    },
    course_name: {
        type: String,
        required: true , 
        unique:false
    }, 
    time:{
        type:String,
        required:true,
        unique:false
    },
    day:{
        type:String ,
        required:true ,
       
        unique:false
    } , 
    period:{
        type:String ,
        required:true ,
        unique:false
       
    } ,
    grade:{
        type:String ,
        required:true ,
      unique:false
       
    } ,
    departement:{
        type:String ,
        required:true ,
      unique:false
       
    } 
    
});
userSchema.index({ time:1 }, { unique: true });
userSchema.index({ day: 1, room: 1, period: 1 }, { unique: true });
userSchema.index({ day: 1, name: 1, period: 1 }, { unique: true });

module.exports = mongoose.model('details', userSchema);


