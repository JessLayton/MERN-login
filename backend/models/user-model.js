const mongoose = require('mongoose');

const emailCheck =  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const passwordCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const userSchema = new mongoose.Schema({
    email: { 
        type: String, unique: true, 
        validate: {
            validator: (isEmail) => {
                return emailCheck.test(isEmail);
            },
            message: props => `${props.value} is not a valid email!`
        },
        required: [true, "Email is required field"]
    },
password: { type: String, required: true, minlength: 8, 
    validate: {
        validator: (isValidPassword) => {
            return passwordCheck.test(isValidPassword);
        },
        message: props => `${props.value} is not a valid password!`
    }},
username: { type: String, maxLength: 25, minlength: 5 },
resetPassLink: { required: false },
resetRequestTimeStamp: { required: false }
}
);

module.exports = User = mongoose.model('user', userSchema);