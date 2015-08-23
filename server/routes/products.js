 
// Retrieve
var mongo = require('mongodb').MongoClient;

var mongoUri = process.env.MONGOLAB_URI || "localhost";

var products = {
 
  getAll: function(req, res) {
    var allProducts = data; // Spoof a DB call

    mongo.connect(mongoUri, function (err, db) {
      if (err) {
          throw err;
      } else {
          console.log("successfully connected to the database");
          res.json(allProducts);

      }
      db.close();
  });
    res.json(allProducts);
  },
 
  getOne: function(req, res) {
    var id = req.params.id;
    var product = data[0]; // Spoof a DB call
    res.json(product);
  },
 
  create: function(req, res) {
    var newProduct = req.body;
    data.push(newProduct); // Spoof a DB call
    res.json(newProduct);
  },
 
  update: function(req, res) {
    var updateProduct = req.body;
    var id = req.params.id;
    data[id] = updateProduct // Spoof a DB call
    res.json(updateProduct);
  },
 
  delete: function(req, res) {
    var id = req.params.id;
    data.splice(id, 1) // Spoof a DB call
    res.json(true);
  }
};
 
var data = [{
  name: 'product 1',
  id: 'connected to db'
}, {
  name: 'product 2',
  id: '2'
}, {
  name: 'product 3',
  id: '3'
}];
 
module.exports = products;