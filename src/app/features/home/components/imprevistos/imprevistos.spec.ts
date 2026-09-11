import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Imprevistos } from './imprevistos';

describe('Imprevistos', () => {
  let component: Imprevistos;
  let fixture: ComponentFixture<Imprevistos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Imprevistos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Imprevistos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
