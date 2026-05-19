const mongoose = require('mongoose');

const complaintSchema =
new mongoose.Schema({

    id: {

        type: String,

        required: true
    },

    studentName: {

        type: String,

        required: true
    },

    roomNumber: {

        type: String,

        required: true
    },

    category: {

        type: String,

        required: true
    },

    priority: {

        type: String,

        required: true
    },

    description: {

        type: String,

        required: true
    },

    contactNumber: {

        type: String
    },

    user: {

        id: {

            type: String,

            required: true
        },

        full_name: {

            type: String,

            required: true
        },

        email: {

            type: String,

            required: true
        }
    },

    status: {

        type: String,

        default: 'pending'
    },

    date: {

        type: Date,

        default: Date.now
    }
});

module.exports =
mongoose.model(
    'Complaint',
    complaintSchema
);