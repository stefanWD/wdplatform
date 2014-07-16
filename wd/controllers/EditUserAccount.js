var controller = require('../controllers/Controller.js'),
dataSender= require('../views/DataSender.js'),
model=require('../models/ContentModel.js');

function EditUserAccount(req,res,next){
	controller.call(this,req,res,next);
}

EditUserAccount.prototype=Object.create(controller.prototype);
EditUserAccount.prototype.constructor=EditUserAccount;

Object.defineProperty(EditUserAccount.prototype,"run",{
value:function(){
	var view = new dataSender(this.res);
	try{
		if(this.req.accepts('application/json')==='application/json')
		{var email=this.req.user.emails[0].value
		var query=this.req.query;
		var country=query.country;
		var city=query.city;
		var skype=query.skype;
		var m= new model(this.req.db,1);
		m.update({_id:email},{$set:{country:country,city:city,skype:skype}},function(err,result){
			if(err)
			{
				view.sendErrorSystem();
			}
			else
			{if(result==1)
				view.send(200,{message:"User has been updated with success."});
				else
				view.send(202,{message:"User not found."});

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
		view.sendErrorSystem();
	}

},
enumerable:true,
configurable:false

});

module.exports=EditUserAccount;