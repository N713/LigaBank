'use strict';

const russia = document.getElementById("russia");
const sng = document.getElementById("sng");
const europe = document.getElementById("europe");
let map;
let markers = [];

let opt = {
  center: {lat: 54.037157, lng: 59.967874},
  zoom: 3.75
};

const russiaLocations = [
  ["Москва", 55.752696, 37.591423],
  ["Санкт - Петербург", 59.924089, 30.281359],
  ["Саратов", 51.545163, 46.018182],
  ["Кировск", 59.882113, 30.984821],
  ["Тюмень", 57.156609, 65.549681],
  ["Омск", 54.992645, 73.362980],
];

const sngLocations = [
  ["Баку", 40.412286, 49.865251],
  ["Ташкент", 41.300054, 69.234726],
  ["Минск", 53.900744, 27.555596],
  ["Алма - Ата", 43.222364, 76.832896],
];

const europeLocations = [
  ["Париж", 48.856805, 2.351178],
  ["Прага", 50.073690, 14.436778],
  ["Лондон", 51.501523, -0.125599],
  ["Рим", 41.901809, 12.492731],
];

const showMarkers = (locations) => {
  markers.forEach((marker) => {
    for (let i = 0; i < locations.length; i++) {
      if (marker.title === locations[i][0]) {
        marker.setMap(map);
      }
    }
  });
};

const hideMarkers = (locations) =>{
  markers.forEach((marker) => {
    for (let i = 0; i < locations.length; i++) {
      if (marker.title === locations[i][0]) {
        marker.setMap(null);
      }
    }
  });
};

const checkMarkers = (region, locations) => {
  if(region.checked) {
    showMarkers(locations);
  } else {
    hideMarkers(locations);
  }
};

const addAllMarkers = () => {
  const allLocations = russiaLocations.concat(sngLocations).concat(europeLocations);

  allLocations.forEach((location) => {
    var myLatLng = new google.maps.LatLng(location[1], location[2]);

    var marker = new google.maps.Marker({
      position: myLatLng,
      title: location[0],
      icon: "/img/icon-pin.svg",
    });

    markers.push(marker);
  });
};

const initialCheck = () => {
  if(russia.checked) {
    showMarkers(russiaLocations);
  }

  if(sng.checked) {
    showMarkers(sngLocations);
  }

  if(europe.checked) {
    showMarkers(europeLocations);
  }
};

const addListeners = () => {
  russia.addEventListener(`change`, (evt) => {
    evt.preventDefault();

    checkMarkers(russia, russiaLocations);
  });

  sng.addEventListener(`change`, (evt) => {
    evt.preventDefault();

    checkMarkers(sng, sngLocations);
  });

  europe.addEventListener(`change`, (evt) => {
    evt.preventDefault();

    checkMarkers(europe, europeLocations);
  });
};

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), opt);

  addAllMarkers();
  initialCheck();
  addListeners();
}
