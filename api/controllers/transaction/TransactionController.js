/**
 * Created by shubham on 23/12/16.
 */
var q = require('q');

module.exports = {
  doTransaction: function (req, res) {
    var data = req.body.data;

    if (!data.product_code || !data.amount_paid ) {
      res.status(400);
      return res.json({
        message: "Invalid request"
      });
    }

    var getProduct = Products.find({product_code: data.product_code});
    getProduct.then(function (products) {
      if(products.length===0){
        res.status(400);
        return res.json({
          message: "Invalid product code"
        });
      }else if(products[0].price> parseFloat(data.amount_paid)){
        res.status(409);
        return res.json({
          message: "Invalid amount paid"
        });
      }

      var product = products[0];

      var transactionObject = {};
      transactionObject.product_id = product.id;
      transactionObject.product_code = product.product_code;
      transactionObject.selling_price = product.price;
      transactionObject.amount_paid = data.amount_paid;
      transactionObject.change_returned = data.amount_paid - product.price;

      var updateQuantity = Products.update({id:product.id}, {available_quantity: product.available_quantity-1});
      var createTransactionRecord = Transaction.create(transactionObject);

      var allPromises = q.all([updateQuantity, createTransactionRecord]);
      allPromises.then(function(success){
        var change_to_return = data.amount_paid - product.price;
        return res.json({
          message: "Success",
          change_to_return:change_to_return
        });
      })
      allPromises.catch(function (err) {
        res.status(500);
        return res.json({
          message: err
        });
      })

    })
    getProduct.catch(function (err) {
      res.status(500);
      return res.json({
        message: err
      });
    })
  },

  getSalesReport: function (req, res) {
    var data = req.body.data;

    if (!data.start_date || !data.end_date ) {
      res.status(400);
      return res.json({
        message: "Invalid request"
      });
    }

    var promise = Transaction.find().where({createdAt: {'>=': data.start_date}, createdAt: {'<=': data.end_date}})
      .sort('createdAt');

    promise.then(function (transactions) {
      return res.json({
        message: transactions
      });
    })
    promise.catch(function (err) {
      res.status(500);
      return res.json({
        message: "Internal Server Error"
      });
    })
  }

}
