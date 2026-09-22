import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaseObjetivo } from './fase-objetivo';

describe('FaseObjetivo', () => {
  let component: FaseObjetivo;
  let fixture: ComponentFixture<FaseObjetivo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FaseObjetivo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FaseObjetivo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
