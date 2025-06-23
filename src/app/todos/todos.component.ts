import { Component, inject, OnInit, signal } from '@angular/core';
import { TodosService } from '../services/todos.service';
import { StreakService } from '../services/streak.service';
import { Todo } from '../model/todo.type';
import { catchError } from 'rxjs';
import { TodoItemComponent } from '../components/todo-item/todo-item.component';
import { FormsModule } from '@angular/forms';
import { SearchTodosPipe } from '../pipes/search-todos.pipe';
import { FilterCompletedTodosPipe } from '../pipes/filter-completed-todos.pipe';
import { StreakWidgetComponent } from '../components/streak-widget/streak-widget.component';

@Component({
  selector: 'app-todos',
  imports: [TodoItemComponent, FormsModule, SearchTodosPipe, FilterCompletedTodosPipe, StreakWidgetComponent],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.scss',
})
export class TodosComponent implements OnInit {
  todoService = inject(TodosService);
  streakService = inject(StreakService);
  todoItems = signal<Array<Todo>>([]);
  searchTerm = signal('');
  newTodoItemTitle = signal('');
  filterStatus = signal<'all' | 'completed' | 'ongoing'>('all');
  streakCount = signal<number>(0);
  completedCount = signal(0);
  ongoingCount = signal(0);

  ngOnInit(): void {
    this.todoService
      .getTodosFromApi()
      .pipe(
        catchError((err) => {
          console.log(err);
          throw err;
        })
      )
      .subscribe((todos) => {
        this.todoItems.set(todos);
        this.updateCompletedCount(todos);
      });

    this.streakCount.set(this.streakService.getStreak());
    this.streakService.resetStreakIfNeeded();
  }

  updateTodoItem(todoItem: Todo) {
    this.todoItems.update((todos) => {
      const updatedTodos = todos.map((todo) => {
        if (todo.id === todoItem.id) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }
        return todo;
      });

      this.updateCompletedCount(updatedTodos);

      return updatedTodos;
    });

    // Updates the streak count if the todo item is completed
    if (!todoItem.completed) {
      console.log('Todo item completed:', todoItem);
      const newStreak = this.streakService.updateStreakForToday();
      this.streakCount.set(newStreak);
    }
  }

  updateCompletedCount(todos: Todo[]) {
    const completedCount = todos.filter(todo => todo.completed).length;
    const ongoingCount = todos.filter(todo => !todo.completed).length;
    this.completedCount.set(completedCount);
    this.ongoingCount.set(ongoingCount);
  }

  addTodoItem() {
    const title = this.newTodoItemTitle().trim();
    if (!title) return;

    const newTodo: Todo = {
      id: Date.now(), // to change later to a proper ID generation
      title,
      completed: false,
      userId: 1, // to change later to a proper user ID
    };

    this.todoItems.update((todos) => {
      const updatedTodos = [newTodo, ...todos];
      this.updateCompletedCount(updatedTodos); // Update counts after adding
      return updatedTodos;
    });
    this.newTodoItemTitle.set(''); // Clear input after adding
  }

  deleteTodoItem(todoItem: Todo) {
    this.todoItems.update((todos) => {
      const updatedTodos = todos.filter(item => item.id !== todoItem.id);
      this.updateCompletedCount(updatedTodos); // Update counts after deleting
      return updatedTodos;
    });
  }

  toggleTodoEditing(todoItem: Todo) {
    this.todoItems.update((todos) =>
      todos.map((todo) =>
        todo.id === todoItem.id ? { ...todo, isEditing: true } : todo
      )
    );
  }

  saveEditedTodo(todoItem: Todo) {
    this.todoItems.update((todos) =>
      todos.map((todo) =>
        todo.id === todoItem.id
          ? { ...todo, title: todoItem.title.trim(), isEditing: false }
          : todo
      )
    );
  }
}