import { Pipe, PipeTransform } from '@angular/core';
import { Todo } from '../model/todo.type';

@Pipe({
  name: 'filterCompletedTodos'
})
export class FilterCompletedTodosPipe implements PipeTransform {

  transform(todos: Todo[], filter: 'all' | 'completed' | 'ongoing'): Todo[] {
    if (filter === 'completed') {
      return todos.filter(todo => todo.completed);
    } else if (filter === 'ongoing') {
      return todos.filter(todo => !todo.completed);
    }
    return todos;
  }

}
