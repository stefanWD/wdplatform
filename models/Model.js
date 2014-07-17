var collections={
		1:"Users",
		2:"InvitedUsers",
		3:"Locations"
	};

function Model(db,collectionNo){
	this.db=db;
	this.collection=this.db.collection(collections[collectionNo]);
}

module.exports=Model;