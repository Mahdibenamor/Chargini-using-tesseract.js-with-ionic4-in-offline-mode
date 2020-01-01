import { TestBed } from '@angular/core/testing';

import { TextDectectService } from './text-dectect.service';

describe('TextDectectService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TextDectectService = TestBed.get(TextDectectService);
    expect(service).toBeTruthy();
  });
});
