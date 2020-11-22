const mongoose = require('mongoose');

const emailCheck =  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const userSchema = new mongoose.Schema({
    email: { 
        type: String, unique: true, 
        validate: {
            validator: function(isEmail) {
                return emailCheck.test(isEmail);
            },
            message: props => `${props.value} is not a valid email!`
        },
        required: [true, "Email is required field"]
    },
password: { type: String, required: true, minlength: 8 },
displayName: { type: String, maxLength: 20, minlength: 5 },
});

module.exports = User = mongoose.model('user', userSchema);