var controller= require('../controllers/Controller.js');
var model = require('../models/ContentModel.js');
var dataSender =require('../views/DataSender.js')



function getCities(req,res,next){
controller.call(this,req,res,next);
}
getCities.prototype=Object.create(getCities);
getCities.prototype.constructor=getCities;


Object.defineProperty(getCities.prototype,"run",
{value:function(){
	var view = new dataSender(this.res);
	try{var country = this.req.query.country.toLowerCase();
		console.log(country);
		var m= new model(this.req.db,3);
		if(!country)
			view.send(202,{message:"Please give a valid country."});
		else
		if(this.req.accepts('application/json')==='application/json'||2===2){
			m.findOne({country:country},{cities:1},function(err,result){
			if( err)
				view.sendErrorSystem();
			else
				view.send(200,result);
			});
		}
		else
		{
			view.sendErrorContent();
		}
	
	}
	catch(exp){
		view.sendErrorSystem();
	}
	},
enumerable:true,
configurable:false

});

module.exports=getCities;