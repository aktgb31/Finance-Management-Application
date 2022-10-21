const catchAsyncErrors = require("./catchAsyncErrors");

exports.register = catchAsyncErrors(async (req, res, next) => {});