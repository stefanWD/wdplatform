var nodemailer=require('nodemailer'),
config=require('../configuration/configuration.js')();

var smtpTransport = nodemailer.createTransport("SMTP",{
    service: "Gmail",
    auth: {
        user: "stefan.p.wiredelta@gmail.com",
        pass: "StefanWD2014"
    }
});

var mailOptions = {
    from: "Wire Delta <stefan.p.wiredelta@gmail.com>", // sender address
    to: "", // list of receivers
    subject: "Invitation to WireDelta", // Subject line
    html: "<b><a href='http://localhost:8080'>Join WIre Detlta!</a>  </b>" // html body
}

function sendMail(email,callback)
{
	mailOptions.to=email;
    buildMessage();
	smtpTransport.sendMail(mailOptions, function(error, response){
        
        try{if(error){
        		throw new Error("Can not send email!");
    			}
    			else
    				{callback(200,'Email has been sent!');
    				}
            }
            catch(err){
                console.log(err);
         callback(500,err.message);
        }
    });
	
   
}

function buildMessage(){
mailOptions.html="<b><a style='color:red' href='http://"+config.host+":"+config.port+"'>You have been invited to to join WD..........................!</a>  </b>";
}

module.exports=sendMail;
