import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaseCenario } from './fase-cenario';

describe('FaseCenario', () => {
  let component: FaseCenario;
  let fixture: ComponentFixture<FaseCenario>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FaseCenario]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FaseCenario);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
