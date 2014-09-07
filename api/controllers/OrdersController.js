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
		

	},
	'activate' : function(req,res,next){
			Orders.findOne(req.param('id'),function foundOrder(err,order){
				if(err) return next(err);
				if(order){
					if(order.orderCode == req.param('orderCode')){
						Orders.update({id:req.param('id')},{status:1}).exec(function(err,updated){
										if(err) return next(err);
										return res.jsonp(updated);
						});
					}else{
						var missCode = {name:'Miss Code',message:'Your Code is miss match'};
						return res.jsonp(missCode);
					}
				}else{
					var noOrder = {name:'No Order',message:'Your Id is not an order Id'};
					return res.jsonp(noOrder);
				}
			});
		},
		'map':function(req,res,next){
			var tow = req.params.all();	
			Orders.find({where:{township:tow['id']}}).exec(function findCB(err,found){
				var loc = {dagon:{lat:'16.783804',lng:'96.156401' },mayangone:{lat:'16.867632',lng:'96.142523'},pannhlaing: {lat:'16.798837', lng:'96.123856'},kamayut :{lat:'16.823889', lng:'96.133981'},yankin:{lat: '16.834770', lng:'96.165932'}};
				
				//console.log(loc[tow['id']]);
				//console.log(found);
				return res.view('order',{orders:found,location:loc[tow['id']]});
            });
			
		}	
};

