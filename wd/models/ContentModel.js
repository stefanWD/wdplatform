var model = require('../models/Model.js');

function ContentModel(db, collectionNo){
	model.call(this,db,collectionNo);
}
ContentModel.prototype=Object.create(model.prototype);
ContentModel.prototype.constructor=ContentModel;

Object.defineProperties(ContentModel.prototype,{
save:{ value:function(query, callback) {
	this.collection.save(query,{w:1},function(err,result){
	console.log("Save error "+ err);
	console.log("Save result "+result); 
		if(err)
			callback(err);
			else
		callback(undefined,result);
	});
	},
	enumerable:true,
	configurable:false
	},
remove:{value: function(query, callback) {
		this.collection.findAndModify(query, [], {}, {remove: true}, function(err,result){
			console.log("Remove error: "+err);
			console.log("Remove result:" +result);
			if(err)
				callback(err);
			else
			callback();	
		});
		},
		enumerable:true,
		confiugrable:false

	},
findOne:{
	value:function(query,projections,callback){
		this.collection.findOne(query,projections, function(err,result){
			if(err)
				callback(err)
			else
			callback(undefined,result);
		});
	},
	enumerable:true,
	configurable:false
},
find:{
	value:function(query,projections,callback){
		this.collection.find(query,projections).toArray(function(err,docs){
			callback(err,docs);
			
		});
	},
	enumerable:true,
	configurable:false
}


});

module.exports=ContentModel;