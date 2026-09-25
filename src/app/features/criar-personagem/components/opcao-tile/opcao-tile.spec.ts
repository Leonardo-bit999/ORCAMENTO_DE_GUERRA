import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpcaoTile } from './opcao-tile';

describe('OpcaoTile', () => {
  let component: OpcaoTile;
  let fixture: ComponentFixture<OpcaoTile>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OpcaoTile],
    }).compileComponents();

    fixture = TestBed.createComponent(OpcaoTile);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
