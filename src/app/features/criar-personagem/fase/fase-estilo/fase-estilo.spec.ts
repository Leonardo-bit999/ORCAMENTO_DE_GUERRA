import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaseEstilo } from './fase-estilo';

describe('FaseEstilo', () => {
  let component: FaseEstilo;
  let fixture: ComponentFixture<FaseEstilo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FaseEstilo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FaseEstilo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
