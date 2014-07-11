var collections={
		1:"InvitesUser"
	};

function Model(db,collectionNo){
	this.db=db;
	this.collection=this.db.collection(collections[collectionNo]);
}

module.exports=Model;