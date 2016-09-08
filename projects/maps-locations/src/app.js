$(document).ready(function() {
  var map, infowindow, querySearch, address, 
    useSideSearch = false, pyrmont, mapZoom = 14,
    places = {};
  
  getGeoLocation();

  function getGeoLocation() {
    var url = 'https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyAytr024G7F4gULgAW1eMTtExZjaFwJuzE';
    $.ajax({
      url: url,
      method: 'POST',
    }).done(function(data) {
      initMap(data.location.lat, data.location.lng);
    }).fail(function() {
      alert("Cannot detect your location");
    });
  }

  function initMap(lat, lng) {
    pyrmont = new google.maps.LatLng(lat, lng);
    map = new google.maps.Map(document.getElementById('map'), {
      center: pyrmont,
      zoom: mapZoom,
    });

    var defaultBounds = new google.maps.LatLngBounds(
      new google.maps.LatLng(lat, lng),
      new google.maps.LatLng(lat, lng));
    var input = document.getElementById('search-query');
    var options = {
      bounds: defaultBounds,
    };
    autocomplete = new google.maps.places.Autocomplete(input, options);
  }

  $('.main-button, .sidenav-button').on("click", function() {
    if ($("#search-query").val() === '') {
      return;
    } else if (useSideSearch && $("#sidenav-query").val() === '') {
      return;
    }

    $(".search-container").hide();
    $(".results-list").empty();
    querySearch = $('#search-query').val();

    if (useSideSearch) {
      querySearch = $("#sidenav-query").val();
    }
 
    map = new google.maps.Map(document.getElementById('map'), {
      center: pyrmont,
      zoom: mapZoom,
    });

    var request = {
      location: pyrmont,
      radius: '10',
      query: querySearch,
    };

    infowindow = new google.maps.InfoWindow();
    var service = new google.maps.places.PlacesService(map);
    service.textSearch(request, callback);

    function callback(results, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
          createMarker(results[i]);
          addSearchResultToSide(results[i]);
          places[results[i].place_id] = results[i];
        }
      }
    }

    function addSearchResultToSide(place) {
      address = place.formatted_address.split(',');
      $(".results-list").append(
        `<li id="${place.place_id}">${place.name}<br>
        ${address[0]}<br>
        ${address[1]}, ${address[2]}</li>`)
    }
    slideSideNav();

    $(".results-list").on("mouseenter", "li", function() {
      var place;
      var findPlace = $(this).attr("id");

      for (var id in places) {
        if (places[id].place_id === findPlace) {
          place = places[id];
        }
      }
      var marker = new google.maps.Marker({
        position: place.geometry.location,
        map: map,
      })
      setContentToMarker(place);
      infowindow.open(map, marker);
      createMarker(place);
    });

    function createMarker(place) {
      var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location,
      });

      google.maps.event.addListener(marker, 'click', function() {
        setContentToMarker(place);
        infowindow.open(map, this);
      });
    }
  });

  function setContentToMarker(place) {
    address = place.formatted_address.split(',');
    infowindow.setContent(
      `<strong>${place.name}</strong><br> 
      ${address[0]}<br>
      ${address[1]}, ${address[2]}`);
  }

  $("#search-query").keydown(function(e) {
    if (e.which == 13) {
      $(".main-button").click();
    }
  });

  $("#sidenav-query").keydown(function(e) {
    if (e.which == 13) {
      $(".sidenav-button").click();
    }
  });

  $(document).on('keydown', function(e) {
    if (e.which == 27 && useSideSearch) {
      $("#close-nav").click();
    }
  })

  function slideSideNav() {
    var mq = window.matchMedia( "(min-width: 500px)" );
    if (mq.matches) {
      $(".sidenav").css("width", "250px");
      $("#map").css("marginLeft", "250px");
      $("#sidenav-query").val(querySearch).focus();
      useSideSearch = true;
    } else {
      return;
    }
  }

  $("#close-nav").on("click", function() {
    $("#search-query").val('').focus();
    $("#map").css("marginLeft", "0");
    $(".sidenav").css("width", "0");
    $(".search-container").show();
    $("#search-query").focus();
    useSideSearch = false;
  });
});