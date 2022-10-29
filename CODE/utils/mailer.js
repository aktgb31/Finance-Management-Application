
const sgMail = require('@sendgrid/mail');
const { EMAIL, ENVIRONMENT, API_KEYS } = require("../config");

const verificationSubject = "Finance Manegement Application Account Verification";

function verificationHTML(to, password) {
    return `<p>Your account on Finance Manegement Application has been created sucessfully. Use following details to sign in. After logging in, you are advised to change password as per your wishes to make the account more secure.<br>User_ID : ${to}<br>Password : ${password}</p>`;
}


async function sendVerificationEmail(to, password) {
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
    sgMail.send(msg);


}

exports.sendVerificationEmail = sendVerificationEmail;