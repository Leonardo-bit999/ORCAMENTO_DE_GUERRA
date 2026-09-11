import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DadosCarousel } from './dados-carousel';

describe('DadosCarousel', () => {
  let component: DadosCarousel;
  let fixture: ComponentFixture<DadosCarousel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DadosCarousel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DadosCarousel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
