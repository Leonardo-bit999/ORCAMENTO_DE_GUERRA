import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconeVibe } from './icone-vibe';

describe('IconeVibe', () => {
  let component: IconeVibe;
  let fixture: ComponentFixture<IconeVibe>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconeVibe]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IconeVibe);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
