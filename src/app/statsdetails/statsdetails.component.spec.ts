import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsdetailsComponent } from './statsdetails.component';

describe('StatsdetailsComponent', () => {
  let component: StatsdetailsComponent;
  let fixture: ComponentFixture<StatsdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatsdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatsdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
