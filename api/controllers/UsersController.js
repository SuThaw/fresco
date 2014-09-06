/**
 * UsersController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var bcrypt = require('bcrypt');
module.exports = {

	
	 'create':function(req,res,next){
        Users.create(req.params.all(),function userCreated(err,user){
                                        //console.log(user);
           var users = req.params.all();
           if(err){
                console.log(err);
                return res.jsonp(err);
             }
     
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

  'signin':function(req,res,next){
  	 if(!req.param('email') || !req.param('password') ){
			//	console.log(req.param('email'));
				var usernamePasswordRequiredError = {name:'usernamePasswordRequired',message:'You must enter both a username and password.'};
			//
			return res.jsonp(usernamePasswordRequiredError);
				
		}
			
			Users.findOneByEmail(req.param('email'),function(err,user){
				if(err) return next(err);

				if(!user){
					var noAccountError = {name:'noAccount',message:'The email address ' + req.param('email') + ' not found.'};
					return res.jsonp(noAccountError);
				}
				
				bcrypt.compare(req.param('password'),user.password,function(err,valid){
					if(err) return next(err);
					//console.log(valid);
					if(!valid){
						var usernamePasswordMismatchError = {name:'usernamePasswordMismatch',message:'Invalid username and password combination'};
					
						return res.jsonp(usernamePasswordMismatchError);
					
					}
				
					if(user.status == 0){
						var userNotActivated = {name:'userNotActivated',message:'User is not activated yet. Plesase activated from your email.'};
						return res.jsonp(userNotActivated);
					}

					//res.redirect('/user/' + user.id);	
					res.jsonp(user);
				});
		});

  }		                                  
                                        
};

