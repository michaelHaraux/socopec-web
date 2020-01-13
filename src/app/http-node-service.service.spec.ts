import { TestBed } from '@angular/core/testing';

import { HTTPNODESERVICEService } from './http-node-service.service';

describe('HTTPNODESERVICEService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HTTPNODESERVICEService = TestBed.get(HTTPNODESERVICEService);
    expect(service).toBeTruthy();
  });
});
