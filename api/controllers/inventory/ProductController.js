/**
 * Created by shubham on 23/12/16.
 */

var q = require('q');

module.exports = {
  getProducts: function (req, res) {

    var promise = Products.find().where({available_quantity:{'>':0}});
    promise.then(function (products) {
      return res.json({
        message: products
      });
    })
    promise.catch(function (err) {
      res.status(500);
      return res.json({
        message: "Internal Server Error"
      });
    })
  },

  createProduct: function (req, res) {
    //console.log(JSON.stringify(req.body));
    var data = req.body.data;

    var createProduct = Products.create(data);
    createProduct.then(function (products) {
      return res.json({
        message: "Product added successfully"
      });
    })
    createProduct.catch(function (err) {
      res.status(500);
      return res.json({
        message: err
      });
    })
  }

}
