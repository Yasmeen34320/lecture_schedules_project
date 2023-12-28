
var userModel = require('./userModel');
const flash = require('express-flash');
const express = require('express');
const session = require('express-session');
const server = express();
server.use(session({
    secret: 'your-secret-key',
    resave: true,
    saveUninitialized: true
}));

server.use(flash());

module.exports.getDataFromDBService = (req) => {
    return new Promise(function checkURL(resolve, reject) {
   
        userModel.find(req.query)
            .exec()
            .then(result => {
                resolve(result);
            })
            .catch(error => {
                reject(error);
            });
       
    });
}

module.exports.createUserDBService = (userDetails) => {
    return new Promise(function myFn(resolve, reject) {
        var userModelData = new userModel();

        userModelData.name = userDetails.name;
        userModelData.course_name = userDetails.course_name;
        userModelData.room = userDetails.room;
        userModelData.time = userDetails.time;
        userModelData.day = userDetails.day;
        userModelData.grade = userDetails.grade;
        userModelData.period = userDetails.period;
        userModelData.unique = userDetails.unique;
        userModelData.departement = userDetails.departement;

        userModelData.save({})
        
            .then(result => {
                resolve(true);
            })
            .catch(error => {
                console.log("sdsdsdsdddddddddddddddddddddddddddddddddddddddd")
                reject(error);
            });

        
    });
}


module.exports.removeUserDBService = (id) => {
    return new Promise(function myFn(resolve, reject) {
        userModel.findByIdAndDelete(id)
            .exec()
            .then(result => {
                resolve(true);
            })
            .catch(error => {
                reject(error);
            });
    });
}

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    flash('error', reason);
   
});
