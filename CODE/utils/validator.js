const validator = require('validator');
const ErrorHandler = require('./errorHandler');

exports.validateName = (name) => {
    if (name == null || name == undefined || name == "")
        return new ErrorHandler(400, "Name is required");
}

exports.validateEmail = (email) => {
    if (email == null || email == undefined || email == "")
        return new ErrorHandler(400, "Email is required");
    if (!validator.isEmail(email))
        return new ErrorHandler(400, "Email is invalid");
}

exports.validateAmount = (amount) => {
    if (amount == null || amount == undefined || amount == "")
        return new ErrorHandler(400, "Amount is required");
    if (!validator.isFloat(amount))
        return new ErrorHandler(400, "Amount is invalid");
}

exports.validateDate = (date) => {
    if (date == null || date == undefined || date == "")
        return new ErrorHandler(400, "Date is required");
    if (!validator.isDate(date))
        return new ErrorHandler(400, "Date is invalid");
}

exports.validateRemarks = (remarks) => {
    if (remarks == null || remarks == undefined || remarks == "")
        return new ErrorHandler(400, "Remarks is required");
}

exports.validateTagId = (tagId) => {
    if (tagId == null || tagId == undefined || tagId == "")
        return new ErrorHandler(400, "TagId is required");
    if (!validator.isInt(tagId))
        return new ErrorHandler(400, "TagId is invalid");
}
