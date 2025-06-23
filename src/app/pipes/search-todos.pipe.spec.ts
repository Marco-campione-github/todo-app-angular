import { SearchTodosPipe } from './search-todos.pipe';

describe('SearchTodosPipe', () => {
  it('create an instance', () => {
    const pipe = new SearchTodosPipe();
    expect(pipe).toBeTruthy();
  });
});
