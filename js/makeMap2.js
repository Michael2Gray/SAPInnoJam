$(document).ready(function () {

document.getElementById("busRoute").onchange = function(){
    makeMaps();
};





var latlong = new Array();
var _coordsList;
 $.ajax({


        url: "js/route44.js",
        type: "GET",
        dataType: 'json',
        success: function (data, textStatus, jqXHR) {

           for (var i = 0; i < data.data[0].stops.length; i++) {
  
                var temp = '{"latLng": [' +data.data[0].stops[i].location+ '],"id":"' + data.data[0].stops[i].name + '"}';

            latlong.push(temp);
        }
        _coordsList = eval("([" + latlong + "])");
        console.log(_coordsList.length)
        console.log(_coordsList);
        
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
              zoom: 12
            }
          },
          marker:{
            values: _coordsList,
            options:{
              draggable: false
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


         $('#map2').gmap3({
          map:{
            options:{
              center:[53.3478, -6.26749],
              zoom: 12
            }
          },
          marker:{
            values: _coordsList,
            options:{
              draggable: false
            },
            events: {
              click: function(marker, event, context){
                markerSelected2(context.id);
              }
            }
          }
        });
        
        $("#bcolor").click(function(){
          var marker = $('#map2').gmap3({get: $("#markerId .value").text() });
          marker.setIcon(marker.getIcon() ? "" : "http://maps.google.com/mapfiles/marker_green.png");
        });
        
        $("#bremove").click(function(){
          $('#map2').gmap3({clear: $("#markerId .value").text() });
          $("#data").hide();
          $("#title").show();
        });
        
      }

 });
      
      function markerSelected(id){

        var marker = $('#map').gmap3({get:id});
        var v = "" + (marker.getPosition().lat()).toFixed(6) + "," + (marker.getPosition().lng()).toFixed(6)+ "";
        var v2 = "" + (marker.getPosition().lat()).toFixed(6) + "," + (marker.getPosition().lng()).toFixed(6)+ "";
        $("#departure").find('option').each(function( i, opt ) {
          $(opt).attr('selected', false);
        });
        $("#departure").find('option').each(function( i, opt ) {
        if( opt.value == v) 
          $(opt).attr('selected', 'selected');
          firstSet = true;
        });

      }


      function markerSelected2(id){

        var marker = $('#map2').gmap3({get:id});
        var v = "" + (marker.getPosition().lat()).toFixed(6) + "," + (marker.getPosition().lng()).toFixed(6)+ "";
        $("#arrival").find('option').each(function( i, opt ) {
          $(opt).attr('selected', false);
        });
        $("#arrival").find('option').each(function( i, opt ) {
        if( opt.value == v) 
          $(opt).attr('selected', 'selected');

        });
      }

