import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FasePerfil } from './fase-perfil';

describe('FasePerfil', () => {
  let component: FasePerfil;
  let fixture: ComponentFixture<FasePerfil>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FasePerfil]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FasePerfil);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
