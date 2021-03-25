import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticshelpComponent } from './statisticshelp.component';

describe('StatisticshelpComponent', () => {
  let component: StatisticshelpComponent;
  let fixture: ComponentFixture<StatisticshelpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatisticshelpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticshelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
