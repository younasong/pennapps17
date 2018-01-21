import { Component } from '@angular/core';

const axios = require('axios');
const stateSongs = require('../state_songs');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  latitude = 39.8283;
  longitude = -98.5795;
  markerLatitude = 0;
  markerLongitude = 0;
  locationChosen = false;
  currentState = '';
  songList = stateSongs;

  onChoseLocation(event) {
    this.markerLatitude = event.coords.lat;
    this.markerLongitude = event.coords.lng;
    this.locationChosen = true;

    var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.markerLatitude},${this.markerLongitude}&components=state`;
    console.log(geocodeUrl);

    axios.get(geocodeUrl).then((response) => {
      if (response.data.status === 'ZERO_RESULTS') {
        throw new Error('Unable to find the address');
      }
      try {
        for (var ac = 0; ac < response.data.results[0].address_components.length; ac++) {
                                      var component = response.data.results[0].address_components[ac];

                                      if(component.types[0] == 'administrative_area_level_1') {
                                        this.currentState = component.long_name;
                                        break;
                                      }
        }
      }
      catch(err) {
        console.log(err);
      }
      console.log(this.currentState);
      console.log(stateSongs[this.currentState]);
  }
}
