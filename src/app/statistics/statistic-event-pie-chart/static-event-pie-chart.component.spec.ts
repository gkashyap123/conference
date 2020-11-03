import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaticEventPieChartComponent } from './static-event-pie-chart.component';

describe('StaticEventPieChartComponent', () => {
  let component: StaticEventPieChartComponent;
  let fixture: ComponentFixture<StaticEventPieChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaticEventPieChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaticEventPieChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
