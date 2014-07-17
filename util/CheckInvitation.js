var model = require("../models/ContentModel.js");

function checkInvitation(db,email,callback){
var m= new model(db,2);
m.findOne({_id:email},{},function(err,result){
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
		{
		var m2= new model(db,1);

		m2.save({_id:email,country:"a",city:"a",role:"a",supervisor:"a",skype:"a"},function(err,result2)
		{if(err)
			callback(undefined);
			else
			{callback(result);

				//removes User from invite list, since he is logged in
			m.remove({_id:email},function(err,result){			
			if(err)
				callback(undefined);
			});
			}
		});
		}
	}
});
}



module.exports=checkInvitation;