import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticRevenuePieChartComponent } from './statistic-revenue-pie-chart.component';

describe('StatisticRevenuePieChartComponent', () => {
  let component: StatisticRevenuePieChartComponent;
  let fixture: ComponentFixture<StatisticRevenuePieChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatisticRevenuePieChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticRevenuePieChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
