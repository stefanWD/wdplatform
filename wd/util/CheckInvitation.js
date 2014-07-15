var model = require("../models/ContentModel.js");

function checkInvitation(db,email){
var m= new model(db,2);
m.findOne({_id:email},function(err,result){
if(err)
	return undefined;
else
	if(!result)
		return undefined;
	else
	{var currentDate= new Date();
	var creationDate= result.date;
	var noDays =(currentDate-creationDate)/ (1000 * 3600 * 24);
	console.log(result);
	if(noDays>=30)
		{m.remove({_id:email},function(err,res){
			return undefined;
		});
	}else
		{			console.log(result);
			return result;

		}
	}

});


}



module.exports=checkInvitation;