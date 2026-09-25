import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconeObjetivo } from './icone-objetivo';

describe('IconeObjetivo', () => {
  let component: IconeObjetivo;
  let fixture: ComponentFixture<IconeObjetivo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconeObjetivo],
    }).compileComponents();

    fixture = TestBed.createComponent(IconeObjetivo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
