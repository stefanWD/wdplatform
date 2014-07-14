var dataSender=require('../views/DataSender.js');


function DataSenderHTML(res,template){
	dataSender.call(this,res);
	this.template=template;
}

DataSenderHTML.prototype=Object.create(dataSender.prototype);
DataSenderHTML.prototype.costructor=DataSenderHTML;
Object.defineProperties(DataSenderHTML.prototype,{
send:{
	value:function(data){
	try{
		this.res.render(this.template,data);
	}
	catch(err){
		this.sendError();
	}
	},
	enumerable:true,
	configurable:true
	},
sendError:{
	value:function(){
	this.res.send(500,{message:'Error while sending page!'});
	
	},
	enumerable:true,
	configurable:false
	}

});


module.exports=DataSenderHTML;
