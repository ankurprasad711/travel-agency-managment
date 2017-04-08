var express = require('express');
var router = express.Router();
var path = require('path');
var db=require('./database.js');

/* GET users listing. */
var d=0;
router.get('/', function(req, res, next) {
   console.log(d);
  if(d===0){
        res.sendFile(path.resolve(__dirname + '/..' + '/public/users.html'))
    }
    else {
        res.sendFile(path.resolve(__dirname + '/..' + '/public/usersection.html'));
    }
});
router.post('/submit',function(req,res) {

    var data = {
        user: req.body.user,
        pas: req.body.pass
    };
    var c = {};
    db.checkloginuser(data, function (result) {
//console.log(result);
        c = result;
        if (c.user === data.user) {

            d = 1;
            console.log('found');
            res.redirect('/users');
        }
        else {
            {
                console.log('not found');
                d = 0;
                res.redirect('/users');
            }
        }

    });
});
var l;
router.post('/adduser',function(req,res) {

    var data={
        username:req.body.username,
        password:req.body.password,
        name:req.body.name,
        gender:req.body.gender,
        address:req.body.address,
        phone:req.body.phone,
        email:req.body.email
    };
    db.adduser(data,function (result) {
        console.log(result);
        if(result){
            l=true;
            res.redirect('/users/update');
        }
        else{
            l=false;
            res.redirect('/users/update');
        }
    });

});
router.get('/update',function (req,res){

    res.render("userudate",{label:l})

});
module.exports = router;
