// class Book {
//   constructor(public author: string, public title: string) {}
// }

// class Movie {
//   constructor(public director: string) {}
// }

// class Song {
//   constructor(public musician: string, public year: number) {}
// }

// This interface helps make the Generic simpler, and we can reference the class instance types with the keys (strings)
// Remember that interfaces are "open" and can be augmented across multiple files in a project
interface EntityMap {
  // book: Book;
  // movie: Movie;
  // song: Song;
}

// Hover over and note auto-completion
// In TS need to use "kind" b/c "type" is a protected name
class Store {
  get<K extends keyof EntityMap>(kind: K, id: string): EntityMap[K] {
    let foo: any = {};
    return foo as EntityMap[K];
  }
  getAll<K extends keyof EntityMap>(kind: K): EntityMap[K][] {
    let foo: any = {};
    return foo as EntityMap[K][];
  }
  create<K extends keyof EntityMap>(kind: K, toCreate: EntityMap[K]): void {}
  update<K extends keyof EntityMap>(
    kind: K,
    id: string,
    toUpdate: Partial<EntityMap[K]>
  ): void {}
}

// Create a store
const store = new Store();

// All the store method have type safety by using the "kind" key string
store.get('book', '123');
store.get('movie', '456');
store.getAll('movie');
store.create('song', { musician: 'John Doe', year: 2022 });
store.update('book', '123', { title: 'Foo Bar' });
