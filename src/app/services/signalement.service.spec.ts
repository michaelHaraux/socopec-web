import { TestBed } from '@angular/core/testing';

import { SignalementService } from './signalement.service';

describe('SignalementService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SignalementService = TestBed.get(SignalementService);
    expect(service).toBeTruthy();
  });
});
