const sgMail = require('@sendgrid/mail');
const { EMAIL, ENVIRONMENT, API_KEYS } = require("../config");

const verificationSubject = "Finance Management Application Account Verification";

function verificationHTML(to, password) {
    return `<p>Your account on Finance Management Application has been created sucessfully. Use following details to sign in. After logging in, you are advised to change password in order to make your account more secure.<br>User_ID : ${to}<br>Password : ${password}</p>`;
}

function forgotPasswordMessageHTML(to, password) {
    return `<p>Your password has been reset. Use following details to sign in. After logging in, you are advised to change password in order to make your account more secure.<br>User_ID : ${to}<br>Password : ${password}</p>`;
}

async function sendVerificationEmail(to, password, type) {
    if (ENVIRONMENT == "development") {
        console.log(`User_ID : ${to} , Password : ${password}`);
        return;
    }

    sgMail.setApiKey(API_KEYS.key);
    const msg = {
        to: to,
        from: EMAIL.user,
        subject: verificationSubject,
        text: ' ',
        html: verificationHTML(to, password),
    };
    if(type == "forgotPassword") {
        msg.subject = "Finance Management Application Password Reset";
        msg.html = forgotPasswordMessageHTML(to, password);
    }
    sgMail.send(msg);
}

exports.sendVerificationEmail = sendVerificationEmail;
