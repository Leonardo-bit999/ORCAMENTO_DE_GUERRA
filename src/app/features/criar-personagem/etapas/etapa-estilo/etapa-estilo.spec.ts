import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtapaEstilo } from './etapa-estilo';

describe('EtapaEstilo', () => {
  let component: EtapaEstilo;
  let fixture: ComponentFixture<EtapaEstilo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EtapaEstilo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EtapaEstilo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
