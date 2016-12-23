/**
 * Created by shubham on 23/12/16.
 */


module.exports = {
  attributes: {
    id: {
      unique: true,
      primaryKey: true,
      autoIncrement: true
    },

    name: {
      type: 'string',
      required: true
    },

    product_code: {
      type: 'string',
      required: true
    },

    price: {
      type: 'float',
      required: true
    },

    available_quantity: {
      type: 'integer',
      required: true
    }
  }
}
