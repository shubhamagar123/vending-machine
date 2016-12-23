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

    product_id:{
      type: 'string',
      required: true
    },
    product_code: {
      type: 'string',
      required: true
    },
    selling_price:{
      type:'float',
      required:true
    },
    amount_paid:{
      type:'float',
      required:true
    },
    change_returned:{
      type:'float',
      required:true
    }
  }
}
