import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpcaoChip } from './opcao-chip';

describe('OpcaoChip', () => {
  let component: OpcaoChip;
  let fixture: ComponentFixture<OpcaoChip>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OpcaoChip],
    }).compileComponents();

    fixture = TestBed.createComponent(OpcaoChip);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
