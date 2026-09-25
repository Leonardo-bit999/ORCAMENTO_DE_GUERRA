import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconePerfil } from './icone-perfil';

describe('IconePerfil', () => {
  let component: IconePerfil;
  let fixture: ComponentFixture<IconePerfil>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconePerfil],
    }).compileComponents();

    fixture = TestBed.createComponent(IconePerfil);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
