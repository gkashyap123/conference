import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RevenueBarChartComponent } from './revenue-bar-chart.component';

describe('RevenueBarChartComponent', () => {
  let component: RevenueBarChartComponent;
  let fixture: ComponentFixture<RevenueBarChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RevenueBarChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RevenueBarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
