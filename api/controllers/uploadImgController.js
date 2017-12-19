'use strict';

module.exports = {
  firstImg: function (req, res, next) {
      if (!req.files)
          return res.status(400).send('No files were uploaded.');
      else if (!req.files.bigImg1 || !req.files.bigImg2 || !req.files.smallImg1 || !req.files.smallImg2) {
          return res.status(400).send('Must have 4 images');
      }
      let bigImg1 = req.files.bigImg1;
      req.imgName = 'rcl' + new Date*1;
      bigImg1.mv('./public/images/bigImg1-' + req.imgName, function(err) {
          if (err)
              return res.status(500).send(err);
          req.response = [];
          req.response.push('https://rlcapi.herokuapp.com/images/bigImg1-' + req.imgName);
          next();
      });
  },
  secondImg: function (req, res, next) {
      let bigImg2 = req.files.bigImg2;
      bigImg2.mv('./public/images/bigImg2-' + req.imgName, function(err) {
          if (err)
              return res.status(500).send(err);
          req.response.push('https://rlcapi.herokuapp.com/images/bigImg2-' + req.imgName);
          next();
      });
  },
  thirdImg: function (req, res, next) {
      let smallImg1 = req.files.smallImg1;
      smallImg1.mv('./public/images/smallImg1-' + req.imgName, function(err) {
          if (err)
              return res.status(500).send(err);
          req.response.push('https://rlcapi.herokuapp.com/images/smallImg1-' + req.imgName);
          next();
      });
  },
  finalImg: function (req, res) {
      let smallImg2 = req.files.smallImg2;
      smallImg2.mv('./public/images/smallImg2-' + req.imgName, function(err) {
          if (err)
              return res.status(500).send(err);
          req.response.push('https://rlcapi.herokuapp.com/images/smallImg2-' + req.imgName);
          res.send(req.response);
      });
  }
};