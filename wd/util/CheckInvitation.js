var model = require("../models/ContentModel.js");

function checkInvitation(db,email,callback){
var m= new model(db,2);
m.findOne({_id:email},function(err,result){
if(err)
	callback(undefined);
else
	if(!result)
		callback(undefined);
	else
	{var currentDate= new Date();
	var creationDate= result.date;
	var noDays =(currentDate-creationDate)/ (1000 * 3600 * 24);
	if(noDays>=30)
		{m.remove({_id:email},function(err,res){
			callback(undefined);
		});
	}else
		{callback(result);
		}
	}

});


}



module.exports=checkInvitation;