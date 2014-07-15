var controller = require('../controllers/Controller.js'),
sendData= require('../views/dataSender.js'),
model= require('../models/ContentModel.js');

function SignUp(req,res,next){
	controller.call(this,req,res,next);
}

SignUp.prototype=Object.create(controller.prototype);
SignUp.prototype.constructor=SignUp;


Object.defineProperty(SignUp.prototype,"run",{
value:function(){

var view = new sendData(this.res);
try{
	if(this.req.accepts('application/json')==='application/json')
	{//console.log(this.req.user);
	var firstName=this.req.user.name.familyName;
	var lastName=this.req.user.name.givenName;
	var email=this.req.user.emails[0].value;
	var pictureUrl=this.req.user._json.picture;

	var m= new model(this.req.db,1);
	//console.log('//////////////////'+this.req.token);
	var result={firstName:firstName,lastName:lastName,email:email,pictureUrl:pictureUrl};
	//console.log(result);
	this.res.json(200,result);
	/*m.findOne({email:email},function(err,result){
		if(err===undefined){
			console.log("result "+email);
			if(result!=={})
				view.send(200,{email:location});
			else
				view.send(202,{})
		}
		else
		{console.log("error "+error);
		view.sendErrorSystem();
		}
	});*/
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


module.exports= SignUp;