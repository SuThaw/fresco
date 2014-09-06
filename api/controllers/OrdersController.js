/**
 * OrdersController
 *
 * @description :: Server-side logic for managing orders
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	'create':function(req,res,next){
		Orders.create(req.params.all(),function orderCreated(err,order){
            console.log(req.params.all());                            //console.log(user);
          
           
           if(err){
                console.log(err);
                return res.jsonp(err);
             }

              var nodemailer = require('nodemailer');
              var transporter = nodemailer.createTransport({
    				service: 'Gmail',
    				auth: {
        				user: 'demo.fresco.customer1@gmail.com',
        				pass: 'demo12345'
    				}
				});

      		  var transporter = nodemailer.createTransport();
      		  //console.log(req.param('userId'));
      		  Users.findOne(req.param('userId'),function foundUser(err,user){
      		  	if(user){
      		  		transporter.sendMail({
    			from: 'demo.fresco.customer1@gmail.com',
        		to: user.email,
        		subject: 'Please Confirm  Your Order',
     			html: 'Dear ' + user.name + ',<br/>Thanks for your order. Here is your code <br/><b>' + order.orderCode + '</b><br/>Best Regards <br/> Fresco Team' 
			 	});
      		  	}
      		  	
      		  });
	 		  
             return res.jsonp(order);
           });

	}	
};

