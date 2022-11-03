exports.json = function (context) {
    return JSON.stringify(context);
}

exports.equals = function (arg1, arg2, options) {
    return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
}