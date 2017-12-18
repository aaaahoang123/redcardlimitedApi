const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    cors = require('cors');

var user = require('./api/routes/userRoute'),
    authentication = require('./api/routes/authenticationRoute');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://aaaahoang123:q07cmf4gt1kb@cluster0-shard-00-00-5tj8j.mongodb.net:27017,cluster0-shard-00-01-5tj8j.mongodb.net:27017,cluster0-shard-00-02-5tj8j.mongodb.net:27017/test?ssl=true&authSource=admin');

// cors to allow post, put method
app.use(cors());
app.set('port', (process.env.PORT || 5000));

//body parser to read the data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use('/api/user', user);
app.use('/api/authentication', authentication);

app.listen(app.get('port'), function () {
   console.log('App run on port: ' + app.get('port'));
});
module.exports = app;