import { TestBed } from '@angular/core/testing';

import { ChatColorService } from './chat-color.service';

describe('ChatColorService', () => {
  let service: ChatColorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatColorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
