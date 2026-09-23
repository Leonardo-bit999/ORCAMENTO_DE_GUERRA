import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtapaPerfil } from './etapa-perfil';

describe('EtapaPerfil', () => {
  let component: EtapaPerfil;
  let fixture: ComponentFixture<EtapaPerfil>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EtapaPerfil]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EtapaPerfil);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
