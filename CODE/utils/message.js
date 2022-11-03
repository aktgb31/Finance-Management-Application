exports.getMessage = (req) => {
    const message = req.session.message;
    req.session.message = null;
    return message;
}