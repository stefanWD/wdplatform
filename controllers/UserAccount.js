var controller = require('../controllers/Controller.js'),
dataSender= require('../views/DataSender.js'),
model= require('../models/ContentModel.js');

                              


function UserAccount(req,res,next){
	controller.call(this,req,res,next);
}

UserAccount.prototype=Object.create(controller.prototype);
UserAccount.prototype.constructor=UserAccount;


Object.defineProperty(UserAccount.prototype,"run",{
value:function(){
var view = new dataSender(this.res);
try{console.log(this.req.accepts());
	if(this.req.accepts('application/json')==='application/json')
	{	var user=this.req.user;
		var firstName=user.name.familyName;
		var lastName=user.name.givenName;
		var email=user.emails[0].value;
		var pictureUrl=user._json.picture;
		var gmailAccountUrl=user._json.link;
		var m= new model(this.req.db,1);

		var profile={firstName:firstName,lastName:lastName,email:email,pictureUrl:pictureUrl,gmailAccountUrl:gmailAccountUrl};
		
		m.findOne({'_id':email},{},function(err,result){
			if(err||!result)
				view.sendErrorSystem();
			else
			{profile.skype=result.skype;
			 profile.role=result.role;
			 profile.supervisor=result.supervisor;
			 profile.country=result.country;
			 profile.city=result.city;
				view.send(200,profile);
			
			}
		});
	}
	else
	{
		view.sendErrorContent();
	}
}
catch(err){
	console.log(err);
	view.sendErrorSystem();
}
},
enumerable:true,
configurable:false

});


module.exports= UserAccount;