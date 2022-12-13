const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Appointment = mongoose.model('Appointment');

router.get('/', (req, res) => {
    res.render("appointment/addOrEdit", {
        viewTitle: "Book An Appointment"
    });
});

router.post('/', (req, res) => {
    if (req.body._id == '')
        insertRecord(req, res);
        else
        updateRecord(req, res);
});

// CREATE
function insertRecord(req, res) {
    var appointment = new Appointment();
    appointment.name = req.body.name;
    appointment.email = req.body.email;
    appointment.phone = req.body.phone;
    appointment.date = req.body.date;
    appointment.timeSlot = req.body.timeSlot;
    appointment.service = req.body.service
    appointment.save((err, doc) => {
        if (!err)
            res.redirect('appointment/list');
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("appointment/addOrEdit", {
                    viewTitle: "Book An Appointment",
                    appointment: req.body
                });
            }
            else
                console.log('Error during record insertion : ' + err);
        }
    });
}

// READ
router.get('/list', (req, res) => {
    Appointment.find((err, docs) => {
        if (!err) {
            res.render("appointment/list", {
                list: docs
            });
        }
        else {
            console.log('Error in retrieving appointment list :' + err);
        }
    });
});

// UPDATE
function updateRecord(req, res) {
    Appointment.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('appointment/list'); }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("appointment/addOrEdit", {
                    viewTitle: 'Edit Appointment',
                    appointment: req.body
                });
            }
            else
                console.log('Error during appointment update : ' + err);
        }
    });
}

router.get('/:id', (req, res) => {
    Appointment.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("appointment/addOrEdit", {
                viewTitle: "Update Appointment",
                appointment: doc
            });
        }
    });
});


// DELETE
router.get('/delete/:id', (req, res) => {
    Appointment.findOneAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/appointment/list');
        }
        else { console.log('Error in appointment delete :' + err); }
    });
});




function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'fullName':
                body['fullNameError'] = err.errors[field].message;
                break;
            case 'email':
                body['emailError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}

module.exports = router;