import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardLocationComponent } from './card-location.component';

describe('LocationComponent', () => {
  let component: CardLocationComponent;
  let fixture: ComponentFixture<CardLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardLocationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
