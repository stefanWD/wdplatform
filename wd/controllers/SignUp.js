var controller = require('../controllers/Controller.js'),
sendData= require('../views/dataSender.js'),
model= require('../models/ContentModel.js'),
getCountries=require('../util/Countries.js');
                              


function SignUp(req,res,next){
	controller.call(this,req,res,next);
}

SignUp.prototype=Object.create(controller.prototype);
SignUp.prototype.constructor=SignUp;


Object.defineProperty(SignUp.prototype,"run",{
value:function(){

var view = new sendData(this.res);
//try{
	if(this.req.accepts('application/json')==='application/json')
	{//console.log(this.req.user);
		var firstName=this.req.user.name.familyName;
		var lastName=this.req.user.name.givenName;
		var email=this.req.user.emails[0].value;
		var pictureUrl=this.req.user._json.picture;

		var m= new model(this.req.db,1);
		var profile={firstName:firstName,lastName:lastName,email:email,pictureUrl:pictureUrl};
		getCountries(this.req.db,function(err,result)
		{
			if(err)
				view.sendErrorSystem();
			else
			{profile.countries=result;
				view.send(200,profile);
			}
	});}
	else
	{
		view.sendErrorContent();
	}
/*}
catch(err){
	console.log(err);
	view.sendErrorSystem();
}*/
},
enumerable:true,
configurable:false

});


module.exports= SignUp;