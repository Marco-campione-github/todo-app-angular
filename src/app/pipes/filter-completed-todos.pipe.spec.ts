import { FilterCompletedTodosPipe } from './filter-completed-todos.pipe';

describe('FilterCompletedTodosPipe', () => {
  it('create an instance', () => {
    const pipe = new FilterCompletedTodosPipe();
    expect(pipe).toBeTruthy();
  });
});
