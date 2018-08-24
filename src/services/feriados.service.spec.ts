import { TestBed, inject } from '@angular/core/testing';

import { FeriadosService } from './feriados.service';

describe('FeriadosService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FeriadosService]
    });
  });

  it('should be created', inject([FeriadosService], (service: FeriadosService) => {
    expect(service).toBeTruthy();
  }));
});
