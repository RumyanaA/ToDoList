const client = require('./../config/dbConnect');
var logger = require('./../services/LoggingService.js');
var bcrypt = require('bcryptjs');
var generatePassword = require('password-generator');
var EmailSender = require('./../services/EmailSender.js');
class UsersModel {

    static async addUser(userData) {
        try {
            const passwordHash = bcrypt.hashSync(userData.password, 10);
            userData.password = passwordHash;
            var query = {
                email: userData.email,
                username: userData.username,
                password: userData.password,
                status: 'pending',
                uniqueStr: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
            }
            var result = await client.get().collection("Users").insertOne(query)
            if (result.acknowledged == true) {
                var mailData = {
                    to: userData.email,
                    subject: 'Email Confirmation',
                    html: `<h1>Email Confirmation</h1>
                <h2>Hello ${userData.username}</h2>
                <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
                <a href=http://localhost:3000/confirm/${query.uniqueStr}> Click here</a>
                </div>`
                }
                var response = EmailSender.sendEmail(mailData);
                return true;
            }
            // return (result.insertedId.toString());
        }
        catch (e) {
            logger.error(e.message);
            if (e.message.includes("email")) {
                return "e.email";
            } else if (e.message.includes("username")) {
                return "e.username";
            }
        }


    }

    static async activate(str) {

        var query = {
            uniqueStr: str
        }
        var result = await client.get().collection("Users").find(query).toArray()
        if (result.length == 1) {
            try {
                var updateStatus = await client.get().collection("Users").updateOne(query, { $set: { status: 'active' } })
                return 'activated';
            } catch (e) {
                logger.error(e.message);
            }
        }
    }

    static async verifyUser(userData) {
        try {
            var query = {
                username: userData.username
            }
            var result = await client.get().collection("Users").find(query).toArray()
            if (result.length == 1 && result[0].status=='active') {
                const verified = bcrypt.compareSync(userData.password, result[0].password);
                if (verified == true) {
                    return (result[0]._id);
                } else {
                    return '-1';
                }
            } else {
                return '-1';
            }
        }
        catch (e) {
            logger.error(e.message);
        }
    }

    static async verifyUserEmail(userData) {
        try {
            var result = await client.get().collection("Users").find(userData).toArray()
            if (result.length == 1) {
                var newPassword = generatePassword();
                const passwordHash = bcrypt.hashSync(newPassword, 10);
                var encryptedPassword = {
                    $set: {
                        'password': passwordHash
                    }
                }
                try {
                    var updatedRes = await client.get().collection('Users').updateOne(userData, encryptedPassword)
                    var mailData = {
                        to: userData.email,
                        subject: 'Password recovery',
                        text: 'Your new password is' + newPassword
                    }
                    var response = EmailSender.sendEmail(mailData);
                    if (response != '-1') {
                        return 'email sent';
                    } else {
                        return '-1';
                    }
                }
                catch (e) {
                    logger.error(e.message);
                }
                //update in database
                //generate password

            } else {
                return '-1';
            }
        }
        catch (e) {
            logger.error(e.message);
        }
    }
}
module.exports = UsersModel;