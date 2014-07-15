var model = require("../models/ContentModel.js");

function getCountries(db,callback){
var m= new model(db,3);

m.find({},{country:1,capital:1},function(err,result){
		callback(err,result);
});

}

module.exports=getCountries;