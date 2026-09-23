import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconeEstilo } from './icone-estilo';

describe('IconeEstilo', () => {
  let component: IconeEstilo;
  let fixture: ComponentFixture<IconeEstilo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconeEstilo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IconeEstilo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
