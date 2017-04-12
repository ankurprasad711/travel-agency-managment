var express = require('express');
var router = express.Router();
var path = require('path');
var db=require('./database.js');

/* GET users listing. */
var d=0;
var name="";
router.get('/', function(req, res, next) {
   console.log(d);
  if(d===0){
        res.sendFile(path.resolve(__dirname + '/..' + '/public/users.html'))
    }
    else {
        res.render('usersection',{name:name});
    }
});
router.post('/getdatabookings', function(req, res, next) {
   var data= {
      name : name
    };
 db.fetchbookings(data,function(result){
    res.send(result);
 });
});

router.post('/delete', function(req, res, next) {
 var data={
     id:req.body.id,
     user:name
 };
db.delete(data,function (result) {
    console.log(result);
   if(result){
       res.render('error');
   }
});
});
router.post('/deleteticket', function(req, res, next) {
    var data={
        id:req.body.id,
        user:name
    };
    console.log(data);
    db.deleteticket(data,function (result) {
        console.log(result);
        if(result){
            res.render('error');
        }
    });
});

router.post('/booktour',function (req,res) {

       var  id=req.body.id;
       var nam=name;
    db.existingtour(function(result){
        console.log(result);
        console.log(id);
 for(var i=0;i<result.length;i++){
    if(result[i].id==id){
        var cost=result[i].cost;
       break;
    }
 }
        res.render('booktour',{id:id,name:nam,cost:cost});
    });


});
router.post('/all',function(req,res){
    res.sendFile(path.resolve(__dirname + '/..' + '/public/tickets.html'));
});
router.post('/existing',function (req,res) {
    var d = new Date();
    var s = '';
    s += d.getFullYear();
    s += '-' + d.getMonth() + '-' + d.getDate();
    var data = {
        id: req.body.id,
        user: req.body.user,
        cost: req.body.c,
        doj: req.body.doj,
        pass: req.body.pass,
        dob: s

    };
    db.bookings(data, function (result) {
        if (result) {
            l = true;
            res.redirect('/users/updat');
        }
        else {
            l = false;
            res.redirect('/users/updat');
        }
    });
});
router.post('/search',function(req,res){
   var data={
       b:req.body.b,
       d:req.body.d

   };
 db.search(data,function (result) {
    res.send(result);
 });
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
        name=c.user;
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
router.get('/updat',function (req,res){

    res.render("ticket",{label:l});

});
router.post('/ticket',function(req,res) {
    var d = new Date();
    var s='';
    s+=d.getFullYear();
    s+='-'+d.getMonth()+'-'+d.getDate();
    var id1=d.getFullYear()+d.getMonth()+d.getDate();
    var data = {
        user: req.body.user,
        pas: req.body.pass,
        boarding:req.body.boarding,
        destination:req.body.destination,
        type:req.body.type,
        dob:s,
        doj:req.body.doj,
        id: id1


    };
   // var c = {};
    db.bookticket(data, function (result) {
//console.log(result);
        if(result){
            l=true;
            res.redirect('/users/updat');
        }
        else{
            l=false;
            res.redirect('/users/updat');
        }



    });

});
router.get('/bookaticket',function(req,res){
  res.sendFile(path.resolve(__dirname + '/..' + '/public/check.html'));
});

router.post('/getticket', function(req, res, next) {
    var data= {
        name : name
    };
    db.getticket(data,function(result){
        res.send(result);
    });
});
module.exports = router;
