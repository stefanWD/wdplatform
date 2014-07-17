var collections={
		1:"User",
		2:"InvitesUser",
		3:"Location"
	};

function Model(db,collectionNo){
	this.db=db;
	this.collection=this.db.collection(collections[collectionNo]);
}

module.exports=Model;