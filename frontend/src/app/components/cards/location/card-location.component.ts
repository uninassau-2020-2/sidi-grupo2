import {Component, Input, OnInit} from '@angular/core';
import {Location} from '../../../location';

@Component({
  selector: 'app-card-location',
  templateUrl: './card-location.component.html',
  styleUrls: ['./card-location.component.sass']
})
export class CardLocationComponent implements OnInit {
  @Input() location: Location = null;

  constructor() {
  }

  ngOnInit(): void {
  }

}
