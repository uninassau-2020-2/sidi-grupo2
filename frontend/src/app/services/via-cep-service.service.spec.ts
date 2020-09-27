import { TestBed } from '@angular/core/testing';

import { ViaCepServiceService } from './via-cep-service.service';

describe('ViaCepServiceService', () => {
  let service: ViaCepServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViaCepServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
