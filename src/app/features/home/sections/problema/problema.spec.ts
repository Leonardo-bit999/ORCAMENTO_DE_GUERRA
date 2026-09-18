import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Problema } from './problema';

describe('Problema', () => {
  let component: Problema;
  let fixture: ComponentFixture<Problema>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Problema]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Problema);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
