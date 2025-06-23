import { Component, signal } from '@angular/core';
import { GreetingComponent } from '../components/greeting/greeting.component';
import { CounterComponent } from '../components/counter/counter.component';

@Component({
  selector: 'app-home',
  imports: [GreetingComponent, CounterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  homeMessage = signal('Hello, world! You just pressed this key: ');

  keyUpHandler(event: KeyboardEvent) {
    console.log(event.key);
    this.homeMessage = signal(`Hello, world! You just pressed this key: ${event.key}`);
  }
}