import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConferencePreviewComponent } from './conference-preview.component';

describe('ConferencePreviewComponent', () => {
  let component: ConferencePreviewComponent;
  let fixture: ComponentFixture<ConferencePreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConferencePreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConferencePreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
