import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasthomepageComponent } from './pasthomepage.component';

describe('PasthomepageComponent', () => {
  let component: PasthomepageComponent;
  let fixture: ComponentFixture<PasthomepageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PasthomepageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasthomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
