import { TestBed } from '@angular/core/testing';

import { ChatDatabaseService } from './chat-database.service';

describe('ChatDatabaseService', () => {
  let service: ChatDatabaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatDatabaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
