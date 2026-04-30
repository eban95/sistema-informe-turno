import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';

import { Ejecutados } from './ejecutados';
import { environment } from '../../../../environments/environment';

describe('Ejecutados', () => {
  let component: Ejecutados;
  let fixture: ComponentFixture<Ejecutados>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ejecutados],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(Ejecutados);
    httpMock = TestBed.inject(HttpTestingController);
    component = fixture.componentInstance;
    fixture.detectChanges();
    const req = httpMock.expectOne(environment.apiUrl);
    req.flush({ data: [] });
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
