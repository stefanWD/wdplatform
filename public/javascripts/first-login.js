

$(document).ready(function(){
 	var email={email:$("#email").val()};
$.ajax('http://localhost:8080/sign-up',{
	dataType:"json",
		contentType:"applicaiton/json",
		data:email,
	success:function(data,xhr,xhr1){
		$('#name').val(data.firstName+" "+data.lastName);
		$('#name').before('<img style =\'width:90px; height:90px\' src='+data.pictureUrl+'>');
		alert(data);
		
	},
	error:function(xhr,ajaxOptions,thrownError){
		alert('error');
	}
});
 });


/*

	<label>Name</label><input id='name'/><br/>
	<label>Country</label><input id='country'/><br/>
	<label>City</label><input id='city'/><br/>
	<label>role></label><input id='role'/><br/>
	<label>Supervisor/Organisation></label><input id='supervisor'><br/>
	<label>Skype</label><input id='skype'/>
	<button>Add</button>




*/



 