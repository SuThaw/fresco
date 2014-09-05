/**
 * UsersController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

	
	 'create':function(req,res,next){
        Users.create(req.params.all(),function userCreated(err,user){
                                        //console.log(user);
           var users = req.params.all();
           if(err){
                console.log(err);
                return res.jsonp(err);
             }
      var nodemailer = require('nodemailer');
      var transporter = nodemailer.createTransport();
	 transporter.sendMail({
    	from: 'suthaw524@gmail.com',
        to: user.email,
        subject: 'Please Activate Your Account',
     	html:"To activate your account please click<br><a href='http://128.199.143.11:1337/users/" + user.id +"/activation/" + user.activation_code + "'>http://128.199.143.11:1337/user/" + user.id + "/activation/" + user.activation_code + "</a> " 
	});
		res.jsonp(user);
  });
  },


  'activate':function(req,res,next){
			Users.findOne(req.param('id'),function foundUser(err,user){
      			if(err) return next(err);
      			if(!user)
      			{
      				var noAccountError = {name:'noAccount',message:'The user id ( ' + req.param('id') + ' ) is not found.'};
					return res.jsonp(noAccountError);
      			}
      			if(user)	
      				
 				if(user.activation_code == req.param('code')){
 					Users.update({id:req.param('id')},{status:1}).exec(function(err,updated){
 						if(err) return next(err);
 							var noAccountError = {name:'Activated',message:'Thanks ' + user.name + '!!. Your account is  actviated. You can login now'};
							return res.jsonp(noAccountError);		
 					});
 				}
      				
      			
     		 });
		},                                  
                                        
};

