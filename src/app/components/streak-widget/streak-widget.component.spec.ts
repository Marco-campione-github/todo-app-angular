import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StreakWidgetComponent } from './streak-widget.component';

describe('StreakWidgetComponent', () => {
  let component: StreakWidgetComponent;
  let fixture: ComponentFixture<StreakWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StreakWidgetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StreakWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
