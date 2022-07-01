import { writable } from 'svelte/store';
import { filter } from 'lodash-es';

function createList() {
  const { subscribe, update } = writable([]);

  return {
    subscribe,
    add: list => update(lists => [...lists, list]),
    delete: listId =>
      update(lists => filter(lists, list => list.id !== listId)),
  };
}

export const lists = createList();
