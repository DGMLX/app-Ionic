import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SeleccionarHoraPage } from './seleccionar-hora.page';

describe('SeleccionarHoraPage', () => {
  let component: SeleccionarHoraPage;
  let fixture: ComponentFixture<SeleccionarHoraPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SeleccionarHoraPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
