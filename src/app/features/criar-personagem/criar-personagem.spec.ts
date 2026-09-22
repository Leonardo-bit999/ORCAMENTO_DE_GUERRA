import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarPersonagem } from './criar-personagem';

describe('CharacterCreation', () => {
  let component: CriarPersonagem;
  let fixture: ComponentFixture<CriarPersonagem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CriarPersonagem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CriarPersonagem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
