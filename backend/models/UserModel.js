const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
    },
    password: {
        type: String,
        required: true,
        minlength: 3,
    },
    role: {
        type: String,
        enum: ['ROLE_STUDENT', 'ROLE_TEACHER','ROLE_ADMIN'],
        required: true,
    },
    name: {
        type: String,
        trim: true,
        required: true,
    },
    surname: {
        type: String,
        trim: true,
        required: true,
    },
    departmentID: {
        type: Schema.Types.ObjectId,
        ref: 'Department'
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;