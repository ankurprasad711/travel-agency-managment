
var express = require('express');
var router = express.Router();
var db=require('./database.js');
var path=require('path');
var d=2;
router.get('/',function(req,res){
    console.log("in admins");
    if(d===0){
        res.sendFile(path.resolve(__dirname + '/..' + '/public/admin.html'))
    }
    else {
        res.sendFile(path.resolve(__dirname + '/..' + '/public/login.html'));
    }
    });
router.get('/getdata',function(req,res){
    console.log('hello');
  db.existingtour(function(result){
      console.log(result);
      res.send(result);


     });

});
var l;
router.get('/upstate',function(req,res){

         res.render('upsate',{label:l});

});
router.post('/addtour',function(req,res) {

    var data={
        id:req.body.id,
        place:req.body.place,
        cost:req.body.cost,
        transport:req.body.transport,
        best:req.body.best
    };
    db.addtour(data,function (result) {
        console.log(result);
        if(result){
            l=true;
            res.redirect('/admins/upstate');
        }
        else{
            l=false;
            res.redirect('/admins/upstate');
        }
    });

});

router.post('/submit',function(req,res){

    var data={
        user:req.body.username,
        pas:req.body.pass
    };
var c={};
db.checklogin(data,function(result){
//console.log(result);
    c=result;
    if(c.user===data.user){

        d=1;
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