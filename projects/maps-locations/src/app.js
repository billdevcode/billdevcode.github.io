$(document).ready(function() {
  
  var map, infowindow, querySearch, address, 
    useSideSearch = false, pyrmont, mapZoom = 14,
    places = {}, cachedPlaces = {};
  
  getGeoLocation();

  function getGeoLocation() {
    const url = 'https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyAytr024G7F4gULgAW1eMTtExZjaFwJuzE';
    $.ajax({
      url,
      method: 'POST',
    }).done(response => {
      const { lat, lng } = response.location;
      initMap(lat, lng);
    }).fail(error => {
      alert("Cannot detect your location");
    });
  }

  function initMap(lat, lng) {
    pyrmont = new google.maps.LatLng(lat, lng);
    map = new google.maps.Map(document.getElementById('map'), {
      center: pyrmont,
      zoom: mapZoom,
    });

    const defaultBounds = new google.maps.LatLngBounds(
      new google.maps.LatLng(lat, lng),
      new google.maps.LatLng(lat, lng));
    const input = document.getElementById('search-query');
    const options = {
      bounds: defaultBounds,
    };
    autocomplete = new google.maps.places.Autocomplete(input, options);
  }

  $('.main-button, .sidenav-button').on("click", function() {
    if ($("#search-query").val() === '' || (useSideSearch && $("#sidenav-query").val() === '')) {
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

    const request = {
      location: pyrmont,
      radius: '10',
      query: querySearch,
    };

    if (cachedPlaces[querySearch]) {
      cachePlaces();
    } else {
      infowindow = new google.maps.InfoWindow();
      const service = new google.maps.places.PlacesService(map);
      service.textSearch(request, callback);
    }

    function cachePlaces() {
      const foundPlaces = cachedPlaces[querySearch];
      const placesLength = foundPlaces.length;
      places = {};
      for (let i = 0; i < placesLength; i++) {
        const { place_id } = foundPlaces[i];
        createMarker(foundPlaces[i]);
        addSearchResultToSide(foundPlaces[i]);
        places[place_id] = foundPlaces[i];        
      }
    }

    function callback(results, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        const listOfPlacesForCache = [];        
        const resultsLength = results.length;
        for (let i = 0; i < resultsLength; i++) {
          const { place_id } = results[i];
          createMarker(results[i]);
          addSearchResultToSide(results[i]);
          places[place_id] = results[i];
          listOfPlacesForCache.push(results[i]);
        }
        cachedPlaces[querySearch] = listOfPlacesForCache;
      }
    }

    function addSearchResultToSide(place) {
      const { formatted_address, place_id, name } = place;
      address = formatted_address.split(',');
      $(".results-list").append(
        `<li id="${place_id}">
          <p>${name}</p>
          <p>${address[0]}</p>
          <p>${address[1]}, ${address[2]}</p>
        </li>`)
    
        addEscKeyListener();
      }
      slideSideNav();

    $(".results-list").on("mouseenter", "li", function() {
      var place;
      const findPlace = $(this).attr("id");

      for (var id in places) {
        if (places[id].place_id === findPlace) {
          place = places[id];
        }
      }
      const marker = new google.maps.Marker({
        position: place.geometry.location,
        map
      })
      setContentToMarker(place);
      infowindow.open(map, marker);
      createMarker(place);
      map.setCenter(marker.getPosition());
    });

    function createMarker(place) {
      const marker = new google.maps.Marker({
        map,
        position: place.geometry.location,
      });

      google.maps.event.addListener(marker, 'mouseover', function() {
        setContentToMarker(place);
        infowindow.open(map, this);
      });
    }
  });

  function setContentToMarker(place) {
    const { formatted_address, name } = place;
    address = formatted_address.split(',');
    infowindow.setContent(
      `<div class="mapMarker">
        <h3>${name}</h3>
        <p>${address[0]}</p>
        <p>${address[1]}, ${address[2]}</p>
      </div>`);
  }

  $("#search-query").keydown(function(e) {
    if (e.which == 13) { $(".main-button").click(); }
  });

  $("#sidenav-query").keydown(function(e) {
    if (e.which == 13) { $(".sidenav-button").click(); }
  });

  function addEscKeyListener() {
    document.addEventListener('keydown', function(e) {
      if (e.which == 27 && useSideSearch) { 
        $("#close-nav").click(); 
      }
    })
  }

  function slideSideNav() {
    const mq = window.matchMedia( "(min-width: 500px)" );
    if (mq.matches) {
      $(".sidenav").velocity({width: "250px"});
      $("#map").velocity({marginLeft: "250px"});
      $("#sidenav-query").val(querySearch).focus();
      useSideSearch = true;
    }
  }

  $("#close-nav").on("click", function() {
    $("#search-query").val('').focus();
    $("#map").velocity({marginLeft: "0px"});
    $(".sidenav").velocity({width: "0px"});
    $(".search-container").show();
    $("#search-query").focus();
    useSideSearch = false;
  });
});