var controller = require('../controllers/Controller.js'),
sendData= require('../views/dataSender.js'),
model= require('../models/ContentModel.js');

function FirstLogIn(req,res,next){
	controller.call(this,req,res,next);
}

FirstLogIn.prototype=Object.create(controller.prototype);
FirstLogIn.prototype.constructor=FirstLogIn;


Object.defineProperty(FirstLogIn.prototype,"run",{
value:function(){

var view = new sendData(this.res);
try{
	//if(this.req.accepts('application/json')!=='application/json')
	if(2===2)
	{console.log(this.req.user);
	var email=this.req.user.emails[0].value;
	var m= new model(this.req.db,1);
	m.findOne({email:email},function(err,result){
		if(err===undefined){
			console.log("result "+email);
			if(result!=={})
			view.send(200,{email:email});
			else
			view.send(202,{})
		}
		else
		{console.log("error "+error);
		view.sendErrorSystem();
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


module.exports= FirstLogIn;