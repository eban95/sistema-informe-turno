import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ejecutados } from './ejecutados';

describe('Ejecutados', () => {
  let component: Ejecutados;
  let fixture: ComponentFixture<Ejecutados>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ejecutados],
    }).compileComponents();

    fixture = TestBed.createComponent(Ejecutados);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
