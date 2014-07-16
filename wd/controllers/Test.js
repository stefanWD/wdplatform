var controller = require('../controllers/Controller.js');
var sendData= require('../views/DataSenderHTML.js');

function Test(req,res,next){
controller.call(this,req,res,next);
}

Test.prototype=Object.create(controller.prototype);
Test.prototype.constructor=Test;

Object.defineProperty(Test.prototype,"run",{
value:function(){
	var view= new sendData(this.res,"FrontEnd/WD.html");
if(this.req.accepts('html')==='html')
{try{
	view.send({});
}
catch(err){
	view.sendError(500,{message:'Error while retriving test page!'});
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


module.exports=Test;