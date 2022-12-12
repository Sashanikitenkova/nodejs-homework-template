const { Conflict } = require("http-errors");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");

const { sendEmail } = require("../../helpers");
const { User } = require("../../model");

const signup = async (req, res) => {
    const { password, email, subscription} = req.body;
    const user = await User.findOne({email});
    if(user) {
        throw new Conflict(`User with ${email} already exist`);
    }
    const verificationToken = nanoid();
    const avatarURL = gravatar.url(email);
    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    const result = await User.create({email, password: hashPassword, subscription, avatarURL, verificationToken});

    const mail = {
        to: email,
        subject: "Подтверждения email",
        html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}">Подтвердить email</a>`
    };
    await sendEmail(mail);
    
    res.status(201).json({
        status: "success",
        code: 201,
        data: {
            user: {
                email: result.email,
                subscription: result.subscription, 
                avatarURL: result.avatarURL,
                verificationToken: result.verificationToken,
            }
        }
    })
}

module.exports = signup;