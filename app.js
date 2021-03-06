const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    cors = require('cors'),
    fileUpload = require('express-fileupload');


var user = require('./api/routes/userRoute'),
    authentication = require('./api/routes/authenticationRoute'),
    product = require('./api/routes/productRoute'),
    brands = require('./api/routes/brandsRoute'),
    categories = require('./api/routes/categoriesRoute'),
    order = require('./api/routes/orderRoute');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://redcardlimited:redcardlimited@ds141796.mlab.com:41796/rclapi');

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
app.use('/api/products', product);
app.use('/api/brands', brands);
app.use('/api/categories', categories);
app.use('/api/orders', order);


app.listen(app.get('port'), function () {
   console.log('App run on port: ' + app.get('port'));
});
module.exports = app;