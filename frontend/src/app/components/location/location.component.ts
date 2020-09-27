import {Component, OnInit} from '@angular/core';
import {ViaCepServiceService} from '../../services/via-cep-service.service';
import {Location} from '../../location';
import {MapsAPILoader} from '@agm/core';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.sass']
})
export class LocationComponent implements OnInit {
  cep = '';
  location: Location = null;
  geoCoder: google.maps.Geocoder;

  constructor(private viaCepService: ViaCepServiceService, private mapsAPILoader: MapsAPILoader) {
  }

  ngOnInit(): void {
    this.mapsAPILoader.load().then(() => {
      this.geoCoder = new google.maps.Geocoder();
    });
  }

  async consultarCep(): Promise<void> {
    this.location = await this.viaCepService.getLocation(this.cep).toPromise();

    this.geoCoder.geocode({
      address: `${this.location.logradouro} ${this.location.bairro}`
    }, (results, status) => {
      if (status === 'OK') {
        if (results[0]) {
          this.location.latitude = results[0].geometry.location.lat();
          this.location.longitude = results[0].geometry.location.lng();
        }
      } else {
        console.log('Falha no Geocoder: ' + status);
      }
    });
  }
}
