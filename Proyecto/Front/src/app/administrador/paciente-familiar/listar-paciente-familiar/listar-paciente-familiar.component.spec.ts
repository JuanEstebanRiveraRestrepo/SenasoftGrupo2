import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarPacienteFamiliarComponent } from './listar-paciente-familiar.component';

describe('ListarPacienteFamiliarComponent', () => {
  let component: ListarPacienteFamiliarComponent;
  let fixture: ComponentFixture<ListarPacienteFamiliarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarPacienteFamiliarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarPacienteFamiliarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
