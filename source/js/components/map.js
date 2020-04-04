'use strict';

const russia = document.getElementById(`russia`);
const sng = document.getElementById(`sng`);
const europe = document.getElementById(`europe`);

const russiaLocations = [
  [`Москва`, 58.037157, 59.967874],
  [`Санкт - Петербург`, 59.924089, 30.281359],
  [`Саратов`, 51.545163, 46.018182],
  [`Кировск`, 59.882113, 30.984821],
  [`Тюмень`, 57.156609, 65.549681],
  [`Омск`, 54.992645, 73.362980],
];

const sngLocations = [
  [`Баку`, 40.412286, 49.865251],
  [`Ташкент`, 41.300054, 69.234726],
  [`Минск`, 53.900744, 27.555596],
  [`Алма - Ата`, 43.222364, 76.832896],
];

const europeLocations = [
  [`Париж`, 48.856805, 2.351178],
  [`Прага`, 50.073690, 14.436778],
  [`Лондон`, 51.501523, -0.125599],
  [`Рим`, 41.901809, 12.492731],
];

function setMarkers(map, locations) {
  locations.forEach((location) => {
    let title = location[0];
    let lat = location[1];
    let lng = location[2];

    const position = new google.maps.LatLng(lat, lng);
    const marker = new google.maps.Marker({
      map: map,
      title: title,
      position: position,
      animation: google.maps.Animation.DROP,
      icon: `/img/icon-pin.svg`,
    });
  });
}

export {setMarkers};
