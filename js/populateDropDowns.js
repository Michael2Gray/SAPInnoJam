$(document).ready(function() {
	//get stops
	$.ajax({
		 type: "GET",
		 url: "js/requestNorthbound.js",             
		 dataType: "json",
		 error: function(XMLHttpRequest, textStatus, errorThrown) {
			 alert(errorThrown);
		 },
		 success:function(data) {   

				
			for (var i = 0; i < data.data[0].stops.length; i++) {
				$('#departure').append(
					$('<option></option>').val(data.data[0].stops[i].location).html(data.data[0].stops[i].name)
				);
				
				$('#arrival').append(
					$('<option></option>').val(data.data[0].stops[i].location).html(data.data[0].stops[i].name)
				);
			}
			
			
		 }
	});
});