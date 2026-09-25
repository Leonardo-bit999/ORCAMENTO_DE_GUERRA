import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtapaCenario } from './etapa-cenario';

describe('EtapaCenario', () => {
  let component: EtapaCenario;
  let fixture: ComponentFixture<EtapaCenario>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EtapaCenario],
    }).compileComponents();

    fixture = TestBed.createComponent(EtapaCenario);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
