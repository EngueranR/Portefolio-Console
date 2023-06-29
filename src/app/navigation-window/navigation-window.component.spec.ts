import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationWindowComponent } from './navigation-window.component';

describe('NavigationWindowComponent', () => {
  let component: NavigationWindowComponent;
  let fixture: ComponentFixture<NavigationWindowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavigationWindowComponent]
    });
    fixture = TestBed.createComponent(NavigationWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
