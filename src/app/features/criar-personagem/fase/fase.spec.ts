import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Fase } from './fase';

describe('Fase', () => {
  let component: Fase;
  let fixture: ComponentFixture<Fase>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Fase]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Fase);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
