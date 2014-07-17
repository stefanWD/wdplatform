

$(document).ready(function(){
 	var email={email:$("#email").val()};
$.ajax('http://localhost:8080/sign-up',{
	dataType:"json",
		contentType:"applicaiton/json",
		data:email,
	success:function(data,xhr,xhr1){
		$('#inputName').val(data.firstName+" "+data.lastName);
		$('.img-thumbnail').attr('src',data.pictureUrl);
		$('#inputRole').val(data.role);
		$('#inputOrg').val(data.supervisor);
		$('#inputSkype').val(data.skype);
		var options="";
		//for(var i=0;i<data.countries.length;i++)
		//	options+="<option>"+data.countries[i].country+"</option>";

		//$('#form-country').empty().append(options);
		//$('#form-city').empty().append('<option>'+data.countries[0].capital+'</option>');
		$('#gmailBtn').attr('href',data.gmailAccountUrl);
		
		
	},
	error:function(xhr,ajaxOptions,thrownError){
		alert('error');
	}
});

$.ajax('http://localhost:8080/get-cities',{
	dataType:"json",
		contentType:"applicaiton/json",
		data:{country:'denmark'},
	success:function(data,xhr,xhr1){
		
		
	},
	error:function(xhr,ajaxOptions,thrownError){
		alert('error');
	}
});

 });
$('#form-country').on('click',function(){
$.ajax('http://localhost:8080/get-countries',{
	dataType:"json",
		contentType:"applicaiton/json",
	success:function(data,xhr,xhr1){
		var options="";
		for(var i=0;i<data.length;i++)
			options+="<option>"+data[i].country+"</option>";

		$('#form-country').empty().append(options);
	
		
	},
	error:function(xhr,ajaxOptions,thrownError){
		alert('error');
	}
});
});

$('.btn-success').on('click',function(evt){
evt.preventDefault();
	var city= $("#form-city").val();
	var country= $("#form-country").val();
	var skype =$('#inputSkype').val();

var data={
	city:city,country:country,skype:skype
}
$.ajax('http://localhost:8080/edit-myaccount-user',{
	dataType:"json",
		contentType:"applicaiton/json",
		data:data,
	success:function(data,xhr,xhr1){

		alert(JSON.stringify(data));
		
		
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



 