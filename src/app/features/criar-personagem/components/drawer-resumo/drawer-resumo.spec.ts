import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawerResumo } from './drawer-resumo';

describe('DrawerResumo', () => {
  let component: DrawerResumo;
  let fixture: ComponentFixture<DrawerResumo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DrawerResumo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrawerResumo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
