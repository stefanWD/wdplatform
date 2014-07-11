var model = require('../models/Model.js');

function ContentModel(db, collectionNo){
	model.call(this,db,collectionNo);
}
ContentModel.prototype=model.prototype;
ContentModel.prototype.constructor=ContentModel;

Object.defineProperties(ContentModel.prototype,{
save:{ value:function(data, callback) {
	this.collection.save(data,{w:1},function(err,result){
	console.log("Save error "+ err);
	console.log("Save result "+result); 
		callback();
	});
	},
	enumerable:true,
	configurable:false
	},
remove:{value: function(data, callback) {
		this.collection.findAndModify(data, [], {}, {remove: true}, function(err,result){
			console.log("Remove error: "+err);
			console.log("Remove result:" +result);
			callback();	
		});
		},
		enumerable:true,
		confiugrable:false

	}


});

module.exports=ContentModel;