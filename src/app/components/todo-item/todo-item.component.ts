import { Component, input, output } from '@angular/core';
import { Todo } from '../../model/todo.type';
import { HighlightCompletedTodoDirective } from '../../directives/highlight-completed-todo.directive';
import { UpperCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo-item',
  imports: [HighlightCompletedTodoDirective, UpperCasePipe, FormsModule],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.scss'
})
export class TodoItemComponent {
  todo = input.required<Todo>();

  todoToggled = output<Todo>();
  deleteTodoItem = output<Todo>();
  todoEdited = output<Todo>();
  toggleEditing = output<Todo>();

  todoClicked() {
    this.todoToggled.emit(this.todo());
  }

  deleteTodo() {
    this.deleteTodoItem.emit( this.todo());
  }

  onEditClick() {
    this.toggleEditing.emit(this.todo());
  }

  onEditFinish() {
    this.todoEdited.emit(this.todo());
  }

}
