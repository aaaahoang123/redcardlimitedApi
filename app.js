const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    cors = require('cors'),
    port = process.env.PORT || 3000;

var user = require('./api/routes/userRoute'),
    authentication = require('./api/routes/authenticationRoute');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/redCardsLimited');

// cors to allow post, put method
app.use(cors());

//body parser to read the data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use('/api/user', user);
app.use('/api/authentication', authentication);

app.listen(port, function () {
   console.log('App run on port: ' + port);
});
module.exports = app;