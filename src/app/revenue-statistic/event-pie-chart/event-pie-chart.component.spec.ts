import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventPieChartComponent } from './event-pie-chart.component';

describe('EventPieChartComponent', () => {
  let component: EventPieChartComponent;
  let fixture: ComponentFixture<EventPieChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventPieChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventPieChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
