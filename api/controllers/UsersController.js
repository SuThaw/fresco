/**
 * UsersController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	 'create':function(req,res,next){
                                User.create(req.params.all(),function userCreated(err,user){
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
     										html:"To activate your account please click<br><a href='http://128.199.143.11:1337/user/" + user.id +"/activation/" + user.activation_code + "'>http://128.199.143.11:1337/user/" + user.id + "/activation/" + user.activation_code + "</a><br/>Your password is: " + users.generated_password
									});
										 res.redirect('/user/' + user.id);
                                });
};

