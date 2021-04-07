import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstServerComponent } from './first-server.component';

describe('FirstServerComponent', () => {
  let component: FirstServerComponent;
  let fixture: ComponentFixture<FirstServerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FirstServerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstServerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
