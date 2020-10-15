import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallePacienteFamiliarComponent } from './detalle-paciente-familiar.component';

describe('DetallePacienteFamiliarComponent', () => {
  let component: DetallePacienteFamiliarComponent;
  let fixture: ComponentFixture<DetallePacienteFamiliarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetallePacienteFamiliarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallePacienteFamiliarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
