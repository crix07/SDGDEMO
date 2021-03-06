import { Component } from '@angular/core';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-distancia',
  templateUrl: './distancia.component.html',
  styles: []
})
export class DistanciaComponent {
  availableProducts: Array<any> = [];
  shoppingBasket: Array<any> = [];

  constructor(public userservice: UsersService) {
  }
  
  receivedData: Array<any> = [];
  public distancia: number;

  transferDataSuccess($event: any) {
    this.distancia = 0;
    let nopduplicated = this.receivedData.filter(received => {
      return received._id === $event._id
    })    
    if ( this.receivedData.length < 2 && nopduplicated.length < 1 ) {
      this.receivedData.push($event);      
    }
    if (this.receivedData.length === 2) {
       let distancia = this.calculateDistance(this.receivedData[0], this.receivedData[1])
       this.distancia = Math.round(distancia)
    }
  }

  calculateDistance(pointA, pointB) {
    const lat1 = pointA.latitude;
    const lon1 = pointA.longitude;

    const lat2 = pointB.latitude;
    const lon2 = pointB.longitude;

    const R = 6371e3; // earth radius in meters
    const φ1 = lat1 * (Math.PI / 180);
    const φ2 = lat2 * (Math.PI / 180);
    const Δφ = (lat2 - lat1) * (Math.PI / 180);
    const Δλ = (lon2 - lon1) * (Math.PI / 180);

    const a = (Math.sin(Δφ / 2) * Math.sin(Δφ / 2)) +
              ((Math.cos(φ1) * Math.cos(φ2)) * (Math.sin(Δλ / 2) * Math.sin(Δλ / 2)));

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c;
    return distance; // in meters
  }
}

