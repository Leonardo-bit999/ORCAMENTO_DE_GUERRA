import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DinheiroBemEstar } from './dinheiro-bem-estar';

describe('DinheiroBemEstar', () => {
  let component: DinheiroBemEstar;
  let fixture: ComponentFixture<DinheiroBemEstar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DinheiroBemEstar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DinheiroBemEstar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
