const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://deeptanshu:DcwV5YolQmKOT68F@demo-cluster.jzmri.mongodb.net/EVLocator?retryWrites=true&w=majority', { useNewUrlParser: true }, (err) => {
    if (!err) { console.log('MongoDB Connection Succeeded.') }
    else { console.log('Error in DB connection : ' + err) }
});

require('./appointment.model');