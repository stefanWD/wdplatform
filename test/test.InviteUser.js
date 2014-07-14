var expect = require("chai").expect,
 model = require("../controllers/InviteUser.js"),
 mongoClient=require('mongodb').MongoClient,
config= require('../configuration/configuration.js')('local'),
mongodb=null;
var req,res;

function fixReqRes(){
req={
	query:{
		email:"stefan.p.wiredelta@gmail.com"
	},
	accepts:function(accepts){
		if(accepts==="application/json")
		return "application/json";
		else
		return "";
	}

}
res={}
var next=function(){};
}

function createConnection(callback){

mongoClient.connect('mongodb://' + config.mongo.host + ':' + config.mongo.port + '/WD_Platform', function(err, db) {
mongodb=db;
});
}

describe("Testing Invite User",function(){
createConnection();

it("It should invite a user to WD Platform",function(done){
setTimeout(function(){
fixReqRes();
req.db=mongodb;
res.json=function(status,message){
		console.log(message.message);
		expect(status).to.equal(200);
		done();
	}
var next= function(){};
var page= new model(req,res,next);
page.run();
 },200);

});


it("It should fail to invite a user to WD Platform, since his email is invalid.",function(done){
setTimeout(function(){
fixReqRes();
req.db=mongodb;
req.query.email='wdplatform@yahoo.com';
res.json=function(status,message){
		console.log(message.message);
		expect(status).to.equal(202);
		expect(message.message).to.equal("Email is not valid, please use a gmail account.");
		done();
	}
var next= function(){};
var page= new model(req,res,next);
page.run();
 },200);

});


it("It should fail to invite a user to WD Platform, since it doesn't support the right content type.",function(done){
setTimeout(function(){
fixReqRes();
req.db=mongodb;
req.query.email='wdplatform@yahoo.com';
req.accepts=function(accepts){
return false;
};
res.json=function(status,message){
		console.log("Status is: "+status);
		expect(status).to.equal(415);
		expect(message.message).to.equal("Content Type not supported by requester.");
		done();
	}
var next= function(){};
var page= new model(req,res,next);
page.run();
 },200);

});



});

