var express = require('express');
var router = express.Router();
var mongodb = require('mongodb').MongoClient;
var objectId= require('mongodb').ObjectID;
var assert=require('assert');
var url = 'mongodb://127.0.0.1:27017/user-db';

<!-- //_______________________________________________//
     //***********************************************//
     //   User Registration Route
     //_______________________________________________//
     //***********************************************// -->

router.post('/registration', function (req, res, next) {
    var user = {
      uname : req.body.uname,
      fname : req.body.fname,
      lname : req.body.lname,
      email : req.body.email,
      pass : req.body.pass
    }

    mongodb.connect(url, function (err, db) {
        assert.equal(null,err);
        db.collection('users').insertOne(user, function (err, result) {
            assert.equal(null,err);
            console.log('data inserted successfully.');
            // console.log(result.CommandResult.ops);
            db.close();
        })
    });
    res.redirect('/user/get-data');
});


<!-- //_______________________________________________//
     //***********************************************//
     //   Showing User List Route
     //_______________________________________________//
     //***********************************************// -->

router.get('/get-data',function (req, res, next) {
    var userArray = [];
    mongodb.connect(url, function (err, db) {
        assert.equal(null, err);
        var users = db.collection('users').find({});
        // console.log(users);
        users.forEach(function (doc, err) {
            assert.equal(null, err);
            userArray.push(doc);
            // console.log(userArray);

        }, function () {
            db.close();
            res.render('show-users-list', { user : userArray }); //console.log(resultArray);
          })
    })
});


<!-- //_______________________________________________//
     //***********************************************//
     //   Showing User Details Route
     //_______________________________________________//
     //***********************************************// -->

router.get('/details/:id', function(req, res, next){
  var id = req.params.id;
  // res.send(id);
  mongodb.connect(url, function (err, db) {
      assert.equal(null, err);
      db.collection('users').findOne({"_id":objectId(id)}, function(err, data){
        assert.equal(null, err);
        // console.log(data);
        res.render('show-users-details', { user : data });

      });
      db.close();
  })
});


<!--
//_______________________________________________//
//***********************************************//
//   Showing User Edit Form
//_______________________________________________//
//***********************************************//
 -->
router.get('/edit/:id', function(req, res, next){
  var id = req.params.id;
  // res.send(id);
  mongodb.connect(url, function (err, db) {
      assert.equal(null, err);
      db.collection('users').findOne({"_id":objectId(id)}, function(err, data){
        assert.equal(null, err);
        // console.log(data);
        res.render('user-edit-form', { user : data });

      });
      db.close();
  })
});


<!--
//_______________________________________________//
//***********************************************//
//   User Update Route
//_______________________________________________//
//***********************************************//
 -->
router.post('/update-data/:id', function(req, res, next){
  var id = req.params.id;
  var updateData = {
    uname : req.body.uname,
    fname : req.body.fname,
    lname : req.body.lname,
    email : req.body.email
  }
  // res.send(id);
  mongodb.connect(url, function (err, db) {
      assert.equal(null, err);
      db.collection('users').updateOne({"_id":objectId(id)}, { $set : updateData}, function(err, data){
        assert.equal(null, err);
        // console.log(data);
        res.redirect('/user/get-data');
      });
      db.close();
  })
});

<!--
//_______________________________________________//
//***********************************************//
//   User Delete Route
//_______________________________________________//
//***********************************************//
 -->
router.get('/delete/:id', function (req, res, next) {
    var id = req.params.id;
    mongodb.connect(url, function (err, db) {
        assert.equal(null,err);
        db.collection('users').deleteOne({"_id":objectId(id)}, function (err, result) {
            assert.equal(null,err);
            // console.log('data deleted  success');
            db.close();
        })
    });
  res.redirect('/user/get-data');
});


module.exports = router;
