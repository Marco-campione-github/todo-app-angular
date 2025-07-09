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

  /**
   * Handles the keyup event on an input element.
   * 
   * Logs the pressed key to the console and updates the `homeMessage` signal
   * with a message indicating which key was pressed.
   *
   * @param event - The keyboard event triggered by the user's key press.
   */
  keyUpHandler(event: KeyboardEvent) {
    console.log(event.key);
    this.homeMessage = signal(`Hello, world! You just pressed this key: ${event.key}`);
  }
}