const mongoose = require('mongoose');
const { Schema } = mongoose;

var collectionName = 'Users';

const UsersSchema = new Schema(
    {
        name: {
            type: String
        },
        email: {
            type: String
        },
        password: {
            type: String
        }
    },
    {
        collection: collectionName
    },
    {
        versionKey: false
    }
);

const User = mongoose.model(collectionName, UsersSchema);

module.exports = User;