import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearMedicoComponent } from './crear-medico.component';

describe('CrearMedicoComponent', () => {
  let component: CrearMedicoComponent;
  let fixture: ComponentFixture<CrearMedicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearMedicoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearMedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
