import { TestBed } from '@angular/core/testing';
import { DBService } from './DB.service';



describe('DBService', () => {
  let service: DBService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DBService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
