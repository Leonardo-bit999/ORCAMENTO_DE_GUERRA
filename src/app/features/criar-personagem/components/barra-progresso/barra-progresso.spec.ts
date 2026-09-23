import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarraProgresso } from './barra-progresso';

describe('BarraProgresso', () => {
  let component: BarraProgresso;
  let fixture: ComponentFixture<BarraProgresso>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BarraProgresso]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BarraProgresso);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
