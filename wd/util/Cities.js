var model = require('./modles/ContentModel.js');

function getCities(db,country,callback){
var m = new model(db,3){
m.findOne({country:country},{cities:1},function(err,result){
callback(err,result);
});
}

}
module.exports=getCities;