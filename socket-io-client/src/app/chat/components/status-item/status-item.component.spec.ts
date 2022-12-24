import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusItemComponent } from './status-item.component';

describe('StatusItemComponent', () => {
  let component: StatusItemComponent;
  let fixture: ComponentFixture<StatusItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatusItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatusItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
