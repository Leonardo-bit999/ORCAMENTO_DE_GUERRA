import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Proposta } from './proposta';

describe('Proposta', () => {
  let component: Proposta;
  let fixture: ComponentFixture<Proposta>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Proposta]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Proposta);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
