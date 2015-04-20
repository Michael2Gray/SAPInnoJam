 $(document).ready(function () {
var latlong = new Array();
 $.ajax({


        url: "route44.js",
        type: "GET",
        dataType: 'json',
        success: function (data, textStatus, jqXHR) {

           for (var i = 0; i < data.data[0].stops.length; i++) {
  
                var temp = {
                   "latLng" : data.data[0].stops[i].location,
                   "id" : data.data[0].stops[i].name
                };

            latlong.push(temp);
        };
        makeMaps();
      },
        error: function (jqXHR, textStatus, errorThrown) {
                    alert("Error: " + textStatus)
        }
  });


function makeMaps() {
        $('#map').gmap3({
          map:{
            options:{
              center:[53.3478, -6.26749],
              zoom: 10
            }
          },
          marker:{
            values: (function () {
                        var values = [];
                        console.log(latlong.length);
                        for (var i = 0; i < latlong.length; i++) {
                            values.push({ latLng: "["+latlong[i].latLng+"]", 
                              id: latlong[i].id });
                            console.log("values"  + values[i].latLng);
                        }
                        //console.log("values"  + values[0].latLng);
                        console.log(values);
                        return values;
                    })(),
            options:{
              draggable: true
            },
            events: {
              click: function(marker, event, context){
                markerSelected(context.id);
              }
            }
          }
        });
        
        $("#bcolor").click(function(){
          var marker = $('#map').gmap3({get: $("#markerId .value").text() });
          marker.setIcon(marker.getIcon() ? "" : "http://maps.google.com/mapfiles/marker_green.png");
        });
        
        $("#bremove").click(function(){
          $('#map').gmap3({clear: $("#markerId .value").text() });
          $("#data").hide();
          $("#title").show();
        });
        
      }

 });
      
      function markerSelected(id){
        var marker = $('#map').gmap3({get:id});
        
        $("#markerId .value").text(id);
        $("#latitude .value").text(marker.getPosition().lat());
        $("#longitude .value").text(marker.getPosition().lng());
        
        $("#data").show();
        $("#title").hide();
      }

