/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var crypto = require('crypto');
module.exports = {
  schema:true,
  attributes: {
    name:{
      type: 'string',
      required: true
    },
    email:{
      type: 'string',
      email: true,
      required:true,
      unique: true
    },
    password:{
      type: 'string',

    },
    address:{
    	type:'string',
    },
    phone:{
      type:'string',
      unique:true
    },
    profile_pic:{
      type:'string',
    },
    status:{
      type:'int',
      defaultsTo:0
    },
    activation_code:{
      type:'string'
    },
    password_reset_code:{
      type:'string'
    },
   

  },

    beforeCreate: function(values,next){
    //console.log(values.password);
    
   
    crypto.randomBytes(20, function(err, buf) {
      values.activation_code = buf.toString('hex');
       // console.log(values.activation_code);
       // done(err, token);
      });


    if(values.password !== undefined){
      require('bcrypt').hash(values.password, 10, function passordEncrypted(err,encryptedPassword){
        if(err) return next(err);
        values.password = encryptedPassword;
        next();
      });

    }else{

    crypto.randomBytes(3, function(err, buf) {
      values.generated_password = buf.toString('hex');
       // console.log(values.activation_code);
       // done(err, token);
        require('bcrypt').hash(values.generated_password, 10, function passordEncrypted(err,encryptedPassword){
        if(err) return next(err);
        values.password = encryptedPassword;
        next();
        });
      });

     
    }
    
    

  }
};



