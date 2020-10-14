import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacienteFamiliarComponent } from './paciente-familiar.component';

describe('PacienteFamiliarComponent', () => {
  let component: PacienteFamiliarComponent;
  let fixture: ComponentFixture<PacienteFamiliarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PacienteFamiliarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PacienteFamiliarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
