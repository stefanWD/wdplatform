var controller = require('../controllers/Controller.js'),
sendData= require('../views/DataSenderHTML.js');

function Index(req,res,next){
controller.call(this,req,res,next);
}

Index.prototype=Object.create(controller.prototype);
Index.prototype.constructor=Index;

Object.defineProperty(Index.prototype,"run",{
value:function(){
	var view= new sendData(this.res,"index.html");
	if(this.req.accepts('html')==='html')
	{try{
		view.send({});
	}
	catch(err){
		view.sendError(500,{message:'Error while retriving homepage!'});
	}
	}
	else
	{
		view.sendContentError();
	}
},
enumerable:true,
configurable:false

});


module.exports=Index;