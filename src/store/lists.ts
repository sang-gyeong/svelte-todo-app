import { writable } from 'svelte/store';
import { filter, map, sortBy } from 'lodash-es';

function createList() {
  const { subscribe, update, set } = writable<List.Item[]>([]);

  return {
    subscribe,
    init: (lists: List.Item[]) => set(lists),
    add: (list: List.Item) => update(lists => [...lists, list]),
    edit: (listId: string, title: string, color: string) =>
      update(lists =>
        map(lists, list =>
          list.id === listId ? { ...list, title, color } : list
        )
      ),
    delete: (listId: string) =>
      update(lists => filter(lists, list => list.id !== listId)),
    reorder: (currentId: string, pos: number) =>
      update(lists =>
        sortBy(
          map(lists, list => (list.id === currentId ? { ...list, pos } : list)),
          ['pos']
        )
      ),
  };
}

export const lists = createList();
