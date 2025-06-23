import { Pipe, PipeTransform } from '@angular/core';
import { Todo } from '../model/todo.type';

@Pipe({
  name: 'searchTodos',
})
export class SearchTodosPipe implements PipeTransform {

  transform(todos: Todo[], searchTerm: String): Todo[] {
    if (!searchTerm) {
      return todos;
    }
    const text = searchTerm.toLowerCase();
    return todos.filter(todo => {
      return todo.title.toLowerCase().includes(text)
    })
  }

}
