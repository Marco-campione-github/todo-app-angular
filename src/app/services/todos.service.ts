import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  query,
  where,
} from '@angular/fire/firestore';
import { Auth, authState } from '@angular/fire/auth';
import { Todo } from '../model/todo.type';
import { Observable, switchMap, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  constructor(
    private firestore: Firestore,
    private auth: Auth
  ) {}

  getTodos(): Observable<Todo[]> {
    return authState(this.auth).pipe(
      switchMap((user) => {
        if (!user) return of([]);
        const todosRef = collection(this.firestore, 'todos');
        const q = query(todosRef, where('userId', '==', user.uid));
        return collectionData(q, { idField: 'id' }) as Observable<Todo[]>;
      })
    );
  }

  addTodo(title: string) {
    const user = this.auth.currentUser;
    if (!user) throw new Error('User not authenticated');

    const todosRef = collection(this.firestore, 'todos');
    return addDoc(todosRef, {
      title,
      completed: false,
      userId: user.uid,
    });
  }

  updateTodo(todo: Todo) {
    const todoRef = doc(this.firestore, `todos/${todo.id}`);
    return updateDoc(todoRef, {
      title: todo.title,
      completed: todo.completed,
    });
  }

  deleteTodo(todoId: string) {
    const todoRef = doc(this.firestore, `todos/${todoId}`);
    return deleteDoc(todoRef);
  }
}
