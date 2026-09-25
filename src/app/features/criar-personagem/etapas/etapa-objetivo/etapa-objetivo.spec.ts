import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtapaObjetivo } from './etapa-objetivo';

describe('EtapaObjetivo', () => {
  let component: EtapaObjetivo;
  let fixture: ComponentFixture<EtapaObjetivo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EtapaObjetivo],
    }).compileComponents();

    fixture = TestBed.createComponent(EtapaObjetivo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
