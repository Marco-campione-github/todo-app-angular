import { Component, input } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-streak-widget',
  imports: [NgIf],
  templateUrl: './streak-widget.component.html',
  styleUrls: ['./streak-widget.component.scss']
})
export class StreakWidgetComponent {
  streak = input.required<number>();
}