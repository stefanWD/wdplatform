var express = require('express');
var router = express.Router();

function Controller(req,res,next){
	this.req=req;
	this.res=res;
	this.next=next;

};

Object.defineProperty(Controller.prototype,"run",{
	value:function(){
	this.res.send(404,'Page not found!');
	},
	enumerable:true,
	configurable:true


});


module.exports=Controller;