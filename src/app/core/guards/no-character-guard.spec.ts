import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { noCharacterGuard } from './no-character-guard';

describe('noCharacterGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => noCharacterGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
