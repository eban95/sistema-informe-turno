import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { EjecutadosService } from './ejecutados';

describe('EjecutadosService', () => {
  let service: EjecutadosService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(EjecutadosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
