import {Component, OnInit} from '@angular/core';
import {ViaCepServiceService} from '../../services/via-cep-service.service';
import {Location} from '../../location';
import {Position} from '../../position';
import {MapsAPILoader} from '@agm/core';
import { FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.sass']
})
export class LocationComponent implements OnInit {
  cep = '';
  location: Location = null;
  positionCurrent = {};
  geoCoder: google.maps.Geocoder;
  map: null;
  position: Position = null;
  loading: Boolean = true;
  errors: String = null;
  constructor(private viaCepService: ViaCepServiceService, private mapsAPILoader: MapsAPILoader) {
  
  }
  
  ngOnInit(): void {

    this.mapsAPILoader.load().then(() => {
      this.geoCoder = new google.maps.Geocoder();
    });
    
    this.getPosition().then(pos=>{
      if(this.position === null){
        this.loading = false;
        this.position = new Position;
        this.position.latitude = pos.lat;
        this.position.longitude = pos.lng;
      }
    });
  }

  setMap(map): void{
    this.map = map;
  }

  cleanFilter(): void{
    this.errors = null
  }

  async getPosition(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.loading = true;
      navigator.geolocation.getCurrentPosition(resp => {
          resolve({lng: resp.coords.longitude, lat: resp.coords.latitude});
        },
        err => {
          reject(err);
        });
    });
  }

  async consultarCep(): Promise<void> {
    this.loading = true;
    this.viaCepService.getLocation(this.cep)
    .subscribe(
      data => {this.successCep(data)},
      error => {
        this.loading = false;
        this.errors = "cep não encontrado";
      },
      () => {}
    );   
  }

  successCep(data: Location){
    this.location = data;
    this.geoCoder.geocode({
      address: `${this.location.logradouro} ${this.location.bairro}`
    }, (results, status) => {
      
      this.loading = false;
      this.errors = '';
      if (status === 'OK') {
        if (results[0]) {
          this.errors = '';
          this.position.latitude = results[0].geometry.location.lat();
          this.position.longitude = results[0].geometry.location.lng();
        }
      } else {
        this.errors = "Cep inválido"
      }
    });
  }
}
