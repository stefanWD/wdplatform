

 $('#btnIU').on('click',function(){
 	var email={email:$("#email").val()};
$.ajax('http://localhost:8080/invite-user',{
	dataType:"html",
		contentType:"applicaiton/json",
		data:email,
	success:function(data,xhr,xhr1){
		alert(JSON.stringify(data));
		alert(xhr+" "+JSON.stringify(xhr1));
	},
	error:function(xhr,ajaxOptions,thrownError){
	}
});
 });