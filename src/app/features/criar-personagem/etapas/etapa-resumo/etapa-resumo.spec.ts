import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtapaResumo } from './etapa-resumo';

describe('EtapaResumo', () => {
  let component: EtapaResumo;
  let fixture: ComponentFixture<EtapaResumo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EtapaResumo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EtapaResumo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
