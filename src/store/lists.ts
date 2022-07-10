import { writable } from 'svelte/store';
import { filter, map } from 'lodash-es';

function createList() {
  const { subscribe, update, set } = writable<List.Item[]>([]);

  return {
    subscribe,
    init: (lists: List.Item[]) => set(lists),
    add: (list: List.Item) =>
      update(lists => [...lists, { ...list, order: lists.length }]),
    edit: (listId: string, title: string, color: string) =>
      update(lists =>
        map(lists, list =>
          list.id === listId ? { ...list, title, color } : list
        )
      ),
    delete: (listId: string) =>
      update(lists => filter(lists, list => list.id !== listId)),
  };
}

export const lists = createList();
