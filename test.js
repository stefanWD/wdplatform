var filename = process.argv[2];
var crypto = require('crypto');
var fs = require('fs');

var shasum = crypto.createHash('sha1');


  shasum.update('dsaaaaaaaaaaaaaaaaaaaaaaaaaaa');


  console.log(  shasum.update('dsaaaaaaaaaaaaaaaaaaaaaaaaaaa').digest('hex')+" lol");
