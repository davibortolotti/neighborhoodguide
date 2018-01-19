var map;
var largeInfowindow;
var markers = [];

var initMap = function() {
  // try {
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat:-22.9361870, lng:-43.1897190 },
      zoom: 15,
      styles: styles
    });
    largeInfowindow = new google.maps.InfoWindow();
    // Create all the markers through the places array
    var CreateMarkers = function() {
      for (i = 0; i < places.length; i++) {
        position = places[i].location;
        title = places[i].title;
        type = places[i].type;
        icon = defineIcon();
        marker = new google.maps.Marker({
          position: position,
          map: map,
          title: title,
          type: type,
          icon: icon
        });
        marker.addListener('click', function() {
          var lat = this.getPosition().lat() + 0.005;
          var lng = this.getPosition().lng();
          map.panTo({lat: lat, lng: lng});
          populateInfoWindow(this, largeInfowindow);
          bounceOnce(this);
        });
        markers.push(marker);
      }
    };


    var defineIcon = function() {
      if (places[i].type == 'Restaurant') { // icon managing
        return './img/restaurant.png';
      } else if (places[i].type == 'Park') {
        return './img/park.png';
      } else if (places[i].type == 'Market') {
        return './img/market.png';
      } else if (places[i].type == 'Club') {
        return './img/club.png';
      } else {
        return './img/club.png';
      }
    };

    var bounceOnce = function(self) {
      self.setAnimation(google.maps.Animation.BOUNCE);
      setTimeout(function(){ self.setAnimation(null); }, 750); // makes the marker bounce only once
    };

    // populates the infowindow with foursquare information and opens it
    var populateInfoWindow = function(marker, infowindow) {
      // Check to make sure the infowindow is not already opened on this marker.
      if (infowindow.marker != marker) {
        // Clear the infowindow content to give the streetview time to load.
        infowindow.setContent('');

        //calls the foursquare API through AJAX
        var foursquareSearch = function() {
          var foursquare_url = 'https://api.foursquare.com/v2/venues/';
          // first ajax call, gets the venue ID
          jQuery.ajax(foursquare_url + "search", {
            data: {
              client_secret: '0JTQ4K5Q11EHF5LCARZAD4V5PQTEGXXK5UXOHM3CLJJKH1MX' ,
              client_id:'S3ZMCRJKWGUOXIZAHLMDS51WE5QLDFUZHVAVMJEKTPKH1QMY',
              v: "20180112",
              query: marker.title,
              ll: marker.getPosition().lat() + ", " + marker.getPosition().lng()
            }
          }).done(function(data) {
            // SECOND ajax call, gets the venue INFO using the id
            marker.venue_id = data.response.venues[0].id;
            jQuery.ajax(foursquare_url + marker.venue_id, {
              data: {
                client_secret: '0JTQ4K5Q11EHF5LCARZAD4V5PQTEGXXK5UXOHM3CLJJKH1MX' ,
                client_id:'S3ZMCRJKWGUOXIZAHLMDS51WE5QLDFUZHVAVMJEKTPKH1QMY',
                v: "20180112"
              }
            }).done(function (data) {
              // sets the content of the info window
              content = '<div class="myfont infowindowfont"><h2><a class="link" href="' + data.response.venue.canonicalUrl + '">' + data.response.venue.name + '</a></h2>';
              content += '<p>' + data.response.venue.location.address + '</p>';
              if (data.response.venue.hours !== undefined) {
                content += '<p>' + data.response.venue.hours.status + '</p>';
              }
              content += '<h3>' + data.response.venue.categories[0].name + '</h3>';
              for (i = 0; i < 2; i++) {
                prefix = data.response.venue.photos.groups[0].items[i].prefix;
                suffix = data.response.venue.photos.groups[0].items[i].suffix;
                smphotourl = prefix + '200x140' + suffix;
                oriphotourl = prefix + 'original' + suffix;
                content += '<a href=' + oriphotourl +'><img class="venuephoto" src="'+ smphotourl + '"></a>';
              }
              if (data.response.venue.price !== undefined) {
                content += '<h3>Preço: ' + data.response.venue.price.message + '</h3>';
              }
              content += '</div>';
              infowindow.setContent(content);


            }).fail(function() { // error handling for foursquare second level ajax
              alert("Error loading foursquare API to get the place's details." );
            });
          }).fail(function() {
            alert("Error loading foursquare API.");
          });
        }; // end of foursquare ajax call
      }
      foursquareSearch();
      infowindow.open(map, marker);
    }
    CreateMarkers();

  ko.applyBindings(myViewModel);

};

var googleError = function() {
  alert("There was an error while sending a request to the Google Server. Please check your firewall or hosts file.")
}


var myViewModel = function() {
  this.venues = ko.observableArray();
  refreshMarkers();
  this.types = [];
  for (i=0; i < markers.length; i++) {
    var type = markers[i].type;
    if (types.indexOf(type) === -1) { // check if typelist already contains this entry
      types.push(type);
    }
  }

  this.zoomTo = function(){ // triggers the effect of clicking a marker, and thus zooming into it
    for (i = 0; i < markers.length; i++) {
      if (markers[i].title == this.title) {
        google.maps.event.trigger(markers[i], 'click');
      }
    }
  };

  this.value = ko.observable();

  this.filter = function(){
    largeInfowindow.close();
    if (this.value() === undefined){ // clears the filter
      for (i = 0; i < markers.length; i++) {
        markers[i].setVisible(true);
      }
    } else {
      for (i = 0; i < markers.length; i++) { // changes visibility according to filter
        if (markers[i].type == this.value()) {
          markers[i].setVisible(true);
        } else {
          markers[i].setVisible(false);
        }
      }
    }
    venues.removeAll(); // clears placelist in order to render again
    refreshMarkers(); // renders place list bar
  };

  function refreshMarkers() { // pushes all visible markers into the venues list
    for (i = 0; i < markers.length; i++){
      if (markers[i].getVisible()){
        venues.push(markers[i]);
      }
    }
  }

  this.menuClick = function(){ //binds clicking action to the menu button
    $('.lateralbar').toggleClass('hide');
  };
  this.mapheight = ko.observable($('#map').css('height'));
  $(window).resize( function() {
    this.mapheight($('#map').css('height'))
  });
};
