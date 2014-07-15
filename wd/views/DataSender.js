function DataSender(res){
	this.res=res;
}

Object.defineProperties(DataSender.prototype,{
send:{
	value:function(status,data){
	try{
		this.res.json(status,data);
	}
	catch(err){
		console.log(err);
		this.sendErrorSystem();
	}
	},
	enumerable:true,
	configurable:true
	},
sendErrorContent:{
	value:function(){
	this.res.json(415,{message:'Content Type not supported by requester.'});
	
	},
	enumerable:true,
	configurable:false
	},
sendErrorSystem:{
	value:function(){
	this.res.json(500,{message:'Request can not be processed, please try later.'})
	},
	enumerable:true,
	configurable:false
}

});
module.exports=DataSender;
