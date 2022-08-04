import { writable } from 'svelte/store';
import { filter, map } from 'lodash-es';

function createList() {
  const { subscribe, update, set } = writable<Card.Item[]>([
    { listId: 'hrhgel61b', content: '123', id: '34sdf', pos: 1 },
    { listId: 'sp859ma9v', content: 'zsdf', id: 'sdf34sakjsdfdf', pos: 2 },
    { listId: 'sp859ma9v', content: 'vv', id: '2342334sdf', pos: 3 },
    { listId: 'hrhgel61b', content: 'vv', id: '23', pos: 4 },
    { listId: 'hrhgel61b', content: 'vxvv', id: '23423', pos: 5 },
  ]);

  return {
    subscribe,
    init: (cards: Card.Item[]) => set(cards),
    add: (card: Card.Item) => update(cards => [...cards, card]),
    delete: (cardId: string) =>
      update(cards => filter(cards, card => card.id !== cardId)),
    edit: (cardId: string, content: string) =>
      update(cards =>
        map(cards, card => (card.id === cardId ? { ...card, content } : card))
      ),
    reorder: (listId: string, cardId: string, pos: number) =>
      update(cards =>
        map(cards, card =>
          card.id === cardId ? { ...card, listId, pos } : card
        )
      ),
  };
}

export const cards = createList();
