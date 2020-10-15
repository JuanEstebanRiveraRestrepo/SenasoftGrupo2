import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearPacienteFamiliarComponent } from './crear-paciente-familiar.component';

describe('CrearPacienteFamiliarComponent', () => {
  let component: CrearPacienteFamiliarComponent;
  let fixture: ComponentFixture<CrearPacienteFamiliarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearPacienteFamiliarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearPacienteFamiliarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
