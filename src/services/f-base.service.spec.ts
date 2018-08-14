import { TestBed, inject } from '@angular/core/testing';

import { FirestoreService } from './f-base.service';

describe('FBaseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FirestoreService]
    });
  });

  it('should be created', inject([FirestoreService], (service: FirestoreService) => {
    expect(service).toBeTruthy();
  }));
});
