const mongoose = require('mongoose');

var appointmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'This field is required.'
    },
    email: {
        type: String
    },
    phone: {
        type: String,
        maxlength: [10, 'Phone Number Must Contain 10 Digits']
    },
    date: {
        type: String
    },
    timeSlot: {
        type: String
    },
    service: {
        type: String
    }
});

// Custom validation for email
appointmentSchema.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Invalid e-mail.');

mongoose.model('Appointment', appointmentSchema);