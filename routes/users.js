var express = require('express');
var router = express.Router();
var path = require('path');
var db=require('./database.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log(__dirname+'/../public/usersection.html');
  res.sendFile(path.resolve(__dirname+'/../public/usersection.html'));
});
router.post('/submit',function(req,res) {

    var data = {
        user: req.body.username,
        pas: req.body.pass
    };
    var c = {};
    db.checklogin(data, function (result) {
//console.log(result);
        c = result;
        if (c.user === data.user) {

            d = 1;
            console.log('found');
            res.redirect('/admins');
        }
        else {
            {
                console.log('not found');
                d = 0;
                res.redirect('/admins');
            }
        }

    });
});
module.exports = router;
