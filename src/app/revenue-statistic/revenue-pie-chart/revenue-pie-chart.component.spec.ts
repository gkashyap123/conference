import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RevenuePieChartComponent } from './revenue-pie-chart.component';

describe('StaticRevenuePieChartComponent', () => {
  let component: RevenuePieChartComponent;
  let fixture: ComponentFixture<RevenuePieChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RevenuePieChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RevenuePieChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
