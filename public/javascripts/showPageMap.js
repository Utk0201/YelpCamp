mapboxgl.accessToken = mapToken;
//before writing above line, make sure you included script for mapbox
//(which we did in boilerplate)
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/light-v10', // style URL
    center: campground.geometry.coordinates,
    //center: [-74.5, 40], // starting position [lng, lat]
    zoom: 10 // starting zoom
});

map.addControl(new mapboxgl.NavigationControl());

new mapboxgl.Marker()
// .setLngLat([-74.5, 40])
.setLngLat(campground.geometry.coordinates)
.setPopup(
    new mapboxgl.Popup({offset:25})
    .setHTML(
        `<h3>${campground.title}</h3><p>${campground.location}</p>`
    )
)
.addTo(map);