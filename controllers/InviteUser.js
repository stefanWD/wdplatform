var controller = require('../controllers/Controller.js'),
mail = require('../util/SendMail.js'),
dataSender= require('../views/DataSender.js'),
model= require('../models/ContentModel.js'),
crypto = require('crypto');

function InviteUser(req,res,next){
	controller.call(this,req,res,next);
}

InviteUser.prototype=Object.create(controller.prototype);
InviteUser.prototype.constructor=InviteUser;

Object.defineProperty(InviteUser.prototype,"run",{
value:function(){
	var view= new dataSender(this.res);
	try{var email=this.req.query.email;
	var m = new model(this.req.db,1);
	if(this.req.accepts('application/json')=='application/json')
		{if(/\S+@gmail.com/.test(email)===true)
		{m.save({email:email,date:new Date()},function(err){
			if(err===undefined){
				var reso=this.res;
					mail(email,function(status,message){	
						if(status!==200)
							{m.remove({email:email},function(){
							view.send(status,{message:message});
							});
							}
							else
						view.send(status,{message:message});

					});
				}
				else
				{
				view.sendErrorSystem();			
				}
			});
		}
		else{
					view.send(202,{message:"Email is not valid, please use a gmail account."});			
				}
	}		
	else
	{
		view.sendErrorContent();
	}	
	}
	catch(err)
		{console.log(err);
		view.sendErrorSystem();
	}
		
},
enumerable:true,
configurable:false
});


module.exports =InviteUser;


