const validator= require('validator');
const ErrorHandler = require('./errorHandler');

exports.validateName = (name) => {
    if(name==null||name==undefined||name=="")
        return new ErrorHandler(400, "Name is required");
}

exports.validateEmail = (email) => {
    if(email==null||email==undefined||email=="")
        return new ErrorHandler(400, "Email is required");
    if(!validator.isEmail(email))
        return new ErrorHandler(400, "Email is invalid");
}
