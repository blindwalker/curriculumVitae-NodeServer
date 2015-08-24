var jwt = require('jwt-simple');
 
/*
var mongo = require('mongodb').MongoClient;

var mongoUri = process.env.MONGOLAB_URI || "localhost";
*/

var auth = {
 
  login: function(req, res) {
 
    var mUsername = req.body.username || '';

    if (mUsername == '') {
      res.status(401);
      res.json({
        "status": 401,
        "message": "Invalid credentials"
      });
      return;
    }
 
    // Fire a query to your DB and check if the credentials are valid
    auth.validateUser(req.db.users, res, mUsername);
 
  },

    login2: function(req, res) {  
 
    var username = req.body.username || '';
    var password = req.body.password || '';
 
    if (username == '' || password == '') {
      res.status(401);
      res.json({
        "status": 401,
        "message": "Invalid credentials"
      });
      return;
    }
 
    // Fire a query to your DB and check if the credentials are valid
    var dbUserObj = auth.validate(username, password);
   
    if (!dbUserObj) { // If authentication fails, we send a 401 back
      res.status(401);
      res.json({
        "status": 401,
        "message": "Invalid credentials"
      });
      return;
    }
 
    if (dbUserObj) {
 
      // If authentication is success, we will generate a token
      // and dispatch it to the client
 
      res.json(genToken(dbUserObj));
    }
 
  },
 
  validate: function(username, password) {
    // spoofing the DB response for simplicity
    var dbUserObj = { // spoofing a userobject from the DB. 
      name: 'arvind',
      role: 'admin',
      username: 'arvind@myapp.com'
    };
 
    return dbUserObj;
  },
 
  validateUser: function(db, res, enteredUsername) {

    db.findOne({username: enteredUsername}, function(error, user){
        if (error) return next(error);
        if (user){
          var dbUserObj = { // spoofing a userobject from the DB. 
            firstname: user.firstname,
            img: user.img,
            username: user.username
          };
        } else {
          res.status(401);
          res.json({
            "status": 401,
            "message": "Invalid credentials"
          });
        }
     
        if (dbUserObj) {
          res.json(dbUserObj);
        }

      });
  },
}
 
// private method
function genToken(user) {
  var expires = expiresIn(7); // 7 days
  var token = jwt.encode({
    exp: expires
  }, require('../config/secret')());
 
  return {
    token: token,
    expires: expires,
    user: user
  };
}
 
function expiresIn(numDays) {
  var dateObj = new Date();
  return dateObj.setDate(dateObj.getDate() + numDays);
}
 
module.exports = auth;