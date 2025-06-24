import { Component, input } from '@angular/core';


@Component({
  selector: 'app-streak-widget',
  imports: [],
  templateUrl: './streak-widget.component.html',
  styleUrls: ['./streak-widget.component.scss']
})
export class StreakWidgetComponent {
  streak = input.required<number>();
}