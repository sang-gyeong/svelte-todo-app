import { writable } from 'svelte/store';
import { filter, map, findIndex, sortBy } from 'lodash-es';
import { POS_DEFAULT_GAP } from '../consts';

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
    addCard: (listId: string, card: Card.Item) =>
      update(lists =>
        map(lists, list =>
          list.id === listId
            ? { ...list, cards: [...(list.cards ?? []), card] }
            : list
        )
      ),
    deleteCard: (listId: string, cardId: string) =>
      update(lists =>
        map(lists, list =>
          list.id === listId
            ? { ...list, cards: filter(list.cards, card => card.id !== cardId) }
            : list
        )
      ),
    editCard: (listId: string, cardId: string, content: string) =>
      update(lists =>
        map(lists, list =>
          list.id === listId
            ? {
                ...list,
                cards: map(list.cards, card =>
                  card.id === cardId ? { ...card, content } : card
                ),
              }
            : list
        )
      ),
    reorderList: (currentId: string, pos: number) =>
      update(lists =>
        sortBy(
          map(lists, list => (list.id === currentId ? { ...list, pos } : list)),
          ['pos']
        )
      ),

    // reorderCard: (listId: string, cardId: string, pos: number) =>
    //   update(lists =>
    //     sortBy(
    //       map(lists, list => (list.id === cardId ? { ...list, pos } : list)),
    //       ['pos']
    //     )
    //   ),
  };
}

export const lists = createList();
