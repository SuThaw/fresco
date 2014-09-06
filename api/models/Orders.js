/**
* Orders.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

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
  	items:{
  		type:'array'
  	},
  	date:{
  		type:'date'
  	},
  	status:{
      type:'int',
      defaultsTo:0
    },
    orderCode:{
    	type:'string'
    }


  }

 };

