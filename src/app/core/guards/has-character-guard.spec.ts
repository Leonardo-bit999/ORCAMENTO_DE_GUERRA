import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { hasCharacterGuard } from './has-character-guard';

describe('hasCharacterGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => hasCharacterGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
