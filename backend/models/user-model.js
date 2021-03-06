const mongoose = require('mongoose');

const emailCheck =  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

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
    password: { type: String, required: true, minlength: 8 },
    username: { type: String, maxLength: 25, minlength: 5 },
    role: { default: "user", type: String },
    resetPassLink: { required: false },
    resetRequestExpiryTime: { required: false }
});

module.exports = User = mongoose.model('user', userSchema);