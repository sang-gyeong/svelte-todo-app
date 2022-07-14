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
  };
}

export const lists = createList();
