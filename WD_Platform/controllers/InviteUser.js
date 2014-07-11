var controller = require('../controllers/Controller.js'),
mail = require('../util/SendMail.js'),
dataSender= require('../views/DataSender.js'),
model= require('../models/ContentModel.js'),
crypto = require('crypto');

function InviteUser(req,res,next){
	controller.call(this,req,res,next);
}

InviteUser.prototype=controller.prototype;
InviteUser.prototype.constructor=InviteUser;

Object.defineProperty(InviteUser.prototype,"run",{
value:function(){
		try{var email=this.req.query.email;
	var view= new dataSender(this.res);
	var m = new model(this.req.db,1);
	if(this.req.accepts('application/json')=='application/json')
		{var shasum = crypto.createHash('sha1');
			var id=shasum.update(email).digest('hex');
			m.save({_id:id,email:email,date:new Date()},function(error){
				if(/\S+@gmail.com/.test(email)===true&&error===undefined){
				var reso=this.res;
					mail(id,email,function(status,message){	
						if(status!==200)
							{m.remove({_id:id},function(){
							view.send(status,{message:message});
							});
							}
							else

						view.send(status,{message:message});

					});
				}
				else
				{
					view.send(202,{message:"Email is not valid!"});			
				}
			});
	}
		
	else
	{
		view.sendErrorContent();
	}	
	}
	catch(err)
		{console.log(err);
			view.send(500,{message:"Error while processing the request! please try again!"});
		
	}
		
},
enumerable:true,
configurable:false
});


module.exports =InviteUser;


