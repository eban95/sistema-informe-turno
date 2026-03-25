import { TestBed } from '@angular/core/testing';

import { Ejecutados } from './ejecutados';

describe('Ejecutados', () => {
  let service: Ejecutados;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Ejecutados);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
