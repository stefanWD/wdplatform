var controller= require('../controllers/Controller.js');
var model = require('../models/ContentModel.js');
var dataSender =require('../views/DataSender.js');

function Locations(req,res,next){
controller.call(this,req,res,next);
}
Locations.prototype=Object.create(Locations);
Locations.prototype.constructor=Locations;


Object.defineProperty(Locations.prototype,"run",
{value:function(){
	var view = new dataSender(this.res);
	try{
		var m= new model(this.req.db,3);
		if(this.req.accepts('application/json')==='application/json'){
			m.find({},{country:1,capital:1,cities:1},function(err,result){
			if( err)
				view.sendErrorSystem();
			else
				view.send(200,result);
			});
		}
		else
		{view.sendErrorContent();
		}
	
	}
	catch(exp){
		view.sendErrorSystem();
	}
	},
enumerable:true,
configurable:false

});

module.exports=Locations;