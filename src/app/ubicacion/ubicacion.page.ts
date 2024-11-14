import { Component} from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import * as L from 'leaflet';

@Component({
  selector: 'app-ubicacion',
  templateUrl: './ubicacion.page.html',
  styleUrls: ['./ubicacion.page.scss'],
})
export class UbicacionPage {


  constructor() { }

  ngOnInit() {
  }

  map!:L.Map

  latitude: number | null = null;
  longitude: number | null = null;



  ionViewDidEnter(){
      this.getCurrentPosition()
  
  }
    
  

  async getCurrentPosition() {
    try {
      const position = await Geolocation.getCurrentPosition();
  
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;
  
      console.log(`Latitud: ${this.latitude}, Longitud: ${this.longitude}`);

      if (this.map) {
        this.map.remove();
      }

      this.map = L.map('mapId').setView([this.latitude, this.longitude], 15);



      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(this.map);

      const markPoint = L.marker([this.latitude, this.longitude]);

     

      const markPointBarber = L.marker([-33.0334208, -71.5358208])
      this.map.addLayer(markPoint);
      this.map.addLayer(markPointBarber)
  
    } catch (error) {
      console.error('Error obteniendo la ubicación', error);
    }
  }
}
