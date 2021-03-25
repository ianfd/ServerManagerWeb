import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevstuffComponent } from './devstuff.component';

describe('DevstuffComponent', () => {
  let component: DevstuffComponent;
  let fixture: ComponentFixture<DevstuffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DevstuffComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DevstuffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
