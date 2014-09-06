/**
* Orders.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/
var crypto = require('crypto');
module.exports = {
  schema:true,
  attributes: {
  	address:{
  		type:'string'
  	},
  	addressLat:{
  		type:'string'
  	},
  	addressLng:{
  		type:'string'
  	},
  	township:{
  		type:'string'
  	},
  	date:{
  		type:'date'
  	},
  	status:{
  		type:'int',
  		 defaultsTo:0
  	},
  	userId:{
  		model:'users'
  	},
  	items:{
  		type:'array'
  	},
  	orderCode:{
  		type:'string'
  		

  		
  	},


  },

  beforeCreate: function(values,next){
  	crypto.randomBytes(3, function(err, buf) {
  		if(err) return next(err);
      	values.orderCode = buf.toString('hex');
      	console.log(values.orderCode);
      	 next();  
      });
      
    // next();
  }
  
};

