const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    cors = require('cors'),
    fileUpload = require('express-fileupload');


var user = require('./api/routes/userRoute'),
    authentication = require('./api/routes/authenticationRoute'),
    product = require('./api/routes/productRoute'),
    uploadImg = require('./api/routes/uploadImgRoute');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://aaaahoang123:q07cmf4gt1kb@ds141796.mlab.com:41796/rclapi');

// cors to allow post, put method
app.use(cors());
app.use(fileUpload());
app.use(express.static('./public'));
app.set('port', (process.env.PORT || 3000));

//body parser to read the data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use('/api/user', user);
app.use('/api/authentication', authentication);
app.use('/api/product', product);
app.use('/api/images', uploadImg);


app.listen(app.get('port'), function () {
   console.log('App run on port: ' + app.get('port'));
});
module.exports = app;