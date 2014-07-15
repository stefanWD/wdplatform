var collections={
		1:"User",
		2:"InvitesUser"
	};

function Model(db,collectionNo){
	this.db=db;
	this.collection=this.db.collection(collections[collectionNo]);
}

module.exports=Model;