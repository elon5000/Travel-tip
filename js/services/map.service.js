export const mapService = {
  initMap,
  addMarker,
  setMarker,
  panTo,
}

import { storageService } from '/storage-services.js'
console.log(storageService)

var gMap
var lat = 32.0749831
var lng = 34.9120554

function initMap(lat = 32.0749831, lng = 34.9120554) {
  console.log('InitMap')
  return _connectGoogleApi().then(() => {
    console.log('google available')
    gMap = new google.maps.Map(document.querySelector('#map'), {
      center: { lat, lng },
      zoom: 15,
    })
    console.log('Map!', gMap)

    google.maps.event.addListener(gMap, 'click', (ev) => {
      setMarker(ev)
    })
  })
}

function setMarker(ev) {
  var marker = new google.maps.Marker({
    position: ev.latLng,
    map: gMap,
    title: 'new marker',
  })
  return marker
}

function addMarker(loc) {
  var marker = new google.maps.Marker({
    position: loc,
    map: gMap,
    title: 'Hello World!',
  })
  return marker
}

function panTo(lat, lng) {
  var laLatLng = new google.maps.LatLng(lat, lng)
  gMap.panTo(laLatLng)
}

function _connectGoogleApi() {
  if (window.google) return Promise.resolve()
  const API_KEY = 'AIzaSyDY7BmM6eVXA7vWgfGy_NDXxWcxdm_XPUg'
  var elGoogleApi = document.createElement('script')
  elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`
  elGoogleApi.async = true
  document.body.append(elGoogleApi)

  return new Promise((resolve, reject) => {
    elGoogleApi.onload = resolve
    elGoogleApi.onerror = () => reject('Google script failed to load')
  })
}
