var map;
var largeInfowindow;
var markers = [];


places = [
  {title: 'Maya Café', location: {lat:-22.941145 , lng: -43.191917},
   type: 'Restaurant'},
  {title: 'Hebraica', location: {lat:-22.935686 , lng: -43.189776},
   type: 'Club'},
  {title: 'Da Horta', location: {lat:-22.9375140 , lng: -43.1905430},
   type: 'Market'},
  {title: 'Canto d\'Alice', location: {lat:-22.9356830 , lng: -43.1913400},
   type: 'Restaurant'},
  {title: 'Hortifruti', location: {lat:-22.933699 , lng: -43.185732},
   type: 'Market'},
  {title: 'Luigi\'s', location: {lat:-22.9334100, lng: -43.1810130},
   type: 'Restaurant'},
  {title: 'Balada Mix', location: {lat: -22.9383020, lng: -43.1916080},
   type: 'Restaurant'},
  {title: 'Parque Guinle', location: {lat: -22.9298820, lng: -43.1839310},
   type: 'Park'},
  {title: 'Rotisseria Sírio-Libanesa', location: {lat: -22.9315160, lng: -43.1788390},
   type: 'Restaurant'},
  {title: 'Princesa', location: {lat: -22.9386820, lng:-43.1922720},
   type: 'Market'},

];

var styles = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#ebe3cd"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#523735"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#f5f1e6"
      }
    ]
  },
  {
    "featureType": "administrative",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#c9b2a6"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#dcd2be"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#ae9e90"
      }
    ]
  },
  {
    "featureType": "landscape.natural",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "landscape.natural",
    "elementType": "labels",
    "stylers": [
      {
        "color": "#f3d58b"
      }
    ]
  },
  {
    "featureType": "landscape.natural",
    "elementType": "labels.text",
    "stylers": [
      {
        "color": "#f3d58b"
      }
    ]
  },
  {
    "featureType": "landscape.natural",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#f3d58b"
      }
    ]
  },
  {
    "featureType": "landscape.natural",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#f3d58b"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "simplified"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#93817c"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#71aa99"
      },
      {
        "saturation": -15
      },
      {
        "lightness": -20
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#a5b076"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#447530"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f5f1e6"
      },
      {
        "saturation": -20
      },
      {
        "lightness": 20
      },
      {
        "weight": 1.5
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "saturation": -35
      },
      {
        "lightness": 15
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#fdfcf8"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f8c967"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#e9bc62"
      }
    ]
  },
  {
    "featureType": "road.highway.controlled_access",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e98d58"
      }
    ]
  },
  {
    "featureType": "road.highway.controlled_access",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#db8555"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#806b63"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#8f7d77"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#ebe3cd"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#b9d3c2"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#92998d"
      }
    ]
  }
]

var initMap = function() {
  try {
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat:-22.9361870, lng:-43.1897190 },
      zoom: 15,
      styles: styles
    });
    largeInfowindow = new google.maps.InfoWindow();
    // Create all the markers through the places array
    function CreateMarkers() {
      for (var i = 0; i < places.length; i++) {
        var position = places[i].location;
        var title = places[i].title;
        var type = places[i].type;
        var icon = function() {
          if (places[i].type == 'Restaurant') {
            return './lib/img/Restaurant.png'
          } else if (places[i].type == 'Park') {
            return './lib/img/Park.png'
          } else if (places[i].type == 'Market') {
            return './lib/img/market.png'
          } else if (places[i].type == 'Club') {
            return './lib/img/club.png'
          } else {
            return './lib/img/club.png'
          }
        }
        var marker = new google.maps.Marker({
          position: position,
          map: map,
          title: title,
          type: type,
          icon: icon()
        });
        marker.addListener('click', function() {
          self = this;
          var lat = self.getPosition().lat() + 0.005;
          var lng = self.getPosition().lng();
          map.panTo({lat: lat, lng: lng});

          populateInfoWindow(self, largeInfowindow);
          bounceOnce(self);
        });
        markers.push(marker)
      };
    }

    CreateMarkers();

    function bounceOnce(self) {
      self.setAnimation(google.maps.Animation.BOUNCE);
      setTimeout(function(){ self.setAnimation(null); }, 750); // makes the marker bounce only once
    }
    // populates the infowindow with foursquare information and opens it
    function populateInfoWindow(marker, infowindow) {
      // Check to make sure the infowindow is not already opened on this marker.
      if (infowindow.marker != marker) {
        // Clear the infowindow content to give the streetview time to load.
        infowindow.setContent('');

        //calls the foursquare API through AJAX
        function foursquareSearch() {
          var foursquare_url = 'https://api.foursquare.com/v2/venues/'

          // first ajax call, gets the venue ID
          jQuery.ajax(foursquare_url + "search", {
            data: {
              client_secret: '0JTQ4K5Q11EHF5LCARZAD4V5PQTEGXXK5UXOHM3CLJJKH1MX' ,
              client_id:'S3ZMCRJKWGUOXIZAHLMDS51WE5QLDFUZHVAVMJEKTPKH1QMY',
              v: "20180112",
              query: marker.title,
              ll: marker.getPosition().lat() + ", " + marker.getPosition().lng()
            },

            success: function(data) {
              // SECOND ajax call, gets the venue INFO using the id
              marker.venue_id = data.response.venues[0].id;
              jQuery.ajax(foursquare_url + marker.venue_id, {
                data: {
                  client_secret: '0JTQ4K5Q11EHF5LCARZAD4V5PQTEGXXK5UXOHM3CLJJKH1MX' ,
                  client_id:'S3ZMCRJKWGUOXIZAHLMDS51WE5QLDFUZHVAVMJEKTPKH1QMY',
                  v: "20180112",
                },

                success: function (data) {
                  // sets the content of the info window
                  content = '<div class="myfont"><h2><a href="' + data.response.venue.canonicalUrl + '">' + data.response.venue.name + '</a></h2>';
                  content += '<p>' + data.response.venue.location.address + '</p>';
                  if (data.response.venue.hours != undefined) {
                    content += '<p>' + data.response.venue.hours.status + '</p>';
                  }
                  content += '<h3>' + data.response.venue.categories[0].name + '</h3>';
                  for (i = 0; i < 2; i++) {
                    var prefix = data.response.venue.photos.groups[0].items[i].prefix;
                    var suffix = data.response.venue.photos.groups[0].items[i].suffix;
                    var smphotourl = prefix + '200x140' + suffix;
                    var oriphotourl = prefix + 'original' + suffix
                    content += '<a href=' + oriphotourl +'><img class="venuephoto" src="'+ smphotourl + '"></a> '
                  }

                  if (data.response.venue.price != undefined) {
                    content += '<h3>Preço: ' + data.response.venue.price.message + '</h3>';
                  }
                  content += '</div>'
                  infowindow.setContent(content);
                },
                error: function(jqXHR, textStatus, errorThrown) { // error handling for foursquare second level ajax
                  alert("Error loading foursquare API to get the place's details." );
                }


              });
            },
            error: function(jqXHR, textStatus, errorThrown) { // error handling for foursquare first level ajax
              alert("Error loading foursquare API.");
            }
          })
        }
      }
      foursquareSearch();
      infowindow.open(map, marker);
    }
  } catch(error) { // error handling for google maps api
    alert("There was an error while loading the Google Maps API. So sorry. ):");
  }

}
var myViewModel = function() {
  this.venues = ko.observableArray()
  refreshMarkers();
  this.types = [];
  for (i=0; i < markers.length; i++) {
    var type = markers[i].type;
    if (types.indexOf(type) === -1) { // check if typelist already contains this entry
      types.push(type)
    }
  }

  this.zoomTo = function(){
    for (i = 0; i < markers.length; i++) {
      if (markers[i].title == this.title) {
        google.maps.event.trigger(markers[i], 'click')
      }
    }
  }

  this.value = ko.observable();

  this.filter = function(){
    largeInfowindow.close();
    if (this.value() == undefined){ // clears the filter
      for (i = 0; i < markers.length; i++) {
        markers[i].setVisible(true);
      }
    } else {
      for (i = 0; i < markers.length; i++) { // changes visibility according to filter
        if (markers[i].type == this.value()) {
          markers[i].setVisible(true)
        } else {
          markers[i].setVisible(false)
        }
      }
    }
    venues.removeAll(); // clears placelist in order to render again
    refreshMarkers(); // renders place list bar
  }

  function refreshMarkers() { // pushes all visible markers into the venues list
    for (i = 0; i < markers.length; i++){
      if (markers[i].getVisible()){
        venues.push(markers[i]);
      }
    }
  }
}

initMap();
ko.applyBindings(myViewModel);
